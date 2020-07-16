import React, { Component } from 'react';
import BaseLayout from '../../shared/BaseLayout';
import './../../styles/app.scss';
import { Row, Col, notification, Button } from 'antd';
import { Product } from '../../../api/Product/Product';
import BaseMeta from '../../shared/BaseMeta';
import BaseHero from '../../shared/BaseHero';
import Container from '../../shared/Container';
import Router, { NextRouter } from 'next/router';
import { Cookie } from 'next-cookie';
import ProductService from '../../../api/Product';
import ImagesList from './components/ImagesList';
import ZoomedImage from '../../shared/ZoomedImage';
import ProductInfo from './components/ProductInfo';
import ProductForm from './components/ProductForm';

type Props = {
  router: NextRouter;
  cookie?: Cookie;
  product: Product;
}

type State = {
  selectedImage: any;
  mobile: boolean;
}
class Shop extends Component<Props, State> {
  MOBILE_WIDTH = 900;
  state = {
    selectedImage: undefined,
    mobile: false,
  }

  static async getInitialProps({ query }) {
    const { id } = query;
    try {
      const product = await ProductService.findOne(id);
      return {
        product
      }
    } catch (error) {
      return {
        product: undefined
      }
    }
  }

  componentDidMount() {
    const { product } = this.props;
    if (!product) {
      Router.push('/shop');
    } else {
      window.addEventListener('resize', this.checkWindowWidth);
      this.setState({ selectedImage: product.images.length > 0 ? product.images[0] : undefined });
      this.checkWindowWidth();
    }
  }

  checkWindowWidth = () => {
    const width = window.innerWidth;
    this.setState({ mobile: width <= this.MOBILE_WIDTH });
  }

  handleImageHover = (image: any) => {
    this.setState({ selectedImage: image })
  }

  render() {
    const { product } = this.props;
    const { selectedImage, mobile } = this.state;
    if (!product) return null;

    return (<BaseLayout navbarTheme='dark'>
      <BaseMeta
        title={product.name}
        description={product.description}
        subject={product.name}
        openGraph={{
          title: product.name,
          type: 'pets',
          url: `https://acuario.franzet.com/shop/product/${product.id}`,
          image: product.images && product.images.length > 0 ? `${process.env.serverUrl}${product.images[0].image}` : `${process.env.applicationUrl}/logo.png`,
          description: product.description
        }}
      />
      <BaseHero title={product.name} backgroundImage='/assets/secondary-hero-bg.jpg' />
      <Container>
        <div className={'product'} id='product'>
          <Row gutter={36}>
            <Col xs={24} lg={14}>
              <Row>
                <Col xs={24} lg={8}>
                  <ImagesList images={product.images} onHover={this.handleImageHover} selected={selectedImage ? selectedImage.image : undefined} />
                </Col>
                <Col xs={24} lg={16} style={{ zIndex: 1 }}>
                  <div className='product__image'>
                    <ZoomedImage image={selectedImage ? selectedImage.image : undefined} mobile={mobile} />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={10}>
              <ProductInfo product={product} />
              <ProductForm product={product} />
              <p className='product__category'>
                <span>CATEGORÍA:</span> {product.subcategory.name}
              </p>
            </Col>
          </Row>
        </div>
      </Container>
    </BaseLayout>);
  }
}

export default Shop;