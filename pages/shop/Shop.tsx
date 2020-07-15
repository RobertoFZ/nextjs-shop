import React, { Component } from 'react';
import BaseLayout from '../shared/BaseLayout';
import './../styles/app.scss';
import BaseMeta from '../shared/BaseMeta';
import BaseHero from '../shared/BaseHero';
import Container from '../shared/Container';
import { Row, Col, notification } from 'antd';
import Categories from './components/Categories';
import ListOrder from './components/ListOrder';
import ProductsList from './components/ProductsList';
import { Business } from '../../api/Business/Business';
import { Product, Category } from '../../api/Product/Product';
import BusinessService from '../../api/Business';
import ProductService from '../../api/Product';
import CategoryService from '../../api/Category';

type Props = {

}

type State = {
  business?: Business;
  categories: Category[];
  selectedCategories: number[];
  loading: boolean;
  products: {
    page: number;
    perPage: number;
    count: number;
    data: Product[];
  }
}
class Shop extends Component<Props, State> {
  state = {
    business: undefined,
    categories: [],
    selectedCategories: [],
    loading: false,
    products: {
      page: 1,
      perPage: 12,
      count: 0,
      data: [],
    }
  }
  componentDidMount() {
    this.getBusiness();
  }

  getBusiness = async () => {
    try {
      this.setState({ loading: true });
      const business = await BusinessService.list();
      if (business.length) {
        this.setState({ business: business[0] }, () => {
          this.getProducts();
          this.getCategories();
        });
      }
    } catch (error) {
      this.setState({ loading: false });
      notification.error({ message: 'Error', description: error.message });
    }
  }

  getProducts = async () => {
    let { business, products, selectedCategories } = this.state;
    try {
      this.setState({ loading: true });
      if (business) {
        const response = await ProductService.list(products.page, products.perPage, 'desc', [business.id], selectedCategories);
        products.count = response.count;
        products.data = response.results;
        this.setState({ products });
      }
      this.setState({ loading: false });
    } catch (error) {
      this.setState({ loading: false });
      notification.error({ message: 'Error', description: error.message });
    }
  }

  getCategories = async () => {
    let { business } = this.state;
    try {
      if (business) {
        const categories = await CategoryService.list(business.id);
        this.setState({ categories });
      }
    } catch (error) {
      notification.error({ message: 'Error', description: error.message });
    }
  }

  onCategorySelected = (category: Category) => {
    let { selectedCategories } = this.state;
    const foundCategory = selectedCategories.find((id: number) => id === category.id);
    if (foundCategory) {
      this.setState({ selectedCategories: selectedCategories.filter((id: number) => id !== category.id) }, () => this.getProducts());
    } else {
      selectedCategories.push(category.id);
      this.setState({ selectedCategories }, () => this.getProducts());
    }
  }

  render() {
    const { products, categories, selectedCategories, loading } = this.state;

    return (<BaseLayout navbarTheme='dark'>
      <div>
        <BaseMeta />
        <BaseHero title='Tienda' />
        <Container>
          <div className={'shop'} id='shop'>
            <Row>
              <Col xs={24} md={24} lg={8}>
                <Categories categories={categories} onClick={this.onCategorySelected} selectedCategories={selectedCategories} />
              </Col>
              <Col xs={24} md={24} lg={16}>
                <ListOrder />
                <ProductsList loading={loading} products={products.data} />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </BaseLayout>);
  }
}

export default Shop;