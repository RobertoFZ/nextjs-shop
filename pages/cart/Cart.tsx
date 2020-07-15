import React, { Component } from 'react';
import BaseLayout from '../shared/BaseLayout';
import './../styles/app.scss';
import { Row, Col, notification, Button } from 'antd';
import { Product } from '../../api/Product/Product';
import BaseMeta from '../shared/BaseMeta';
import BaseHero from '../shared/BaseHero';
import Container from '../shared/Container';
import Router from 'next/router';
import { Cookie, withCookie } from 'next-cookie';
import { getUserCart, setUserCart, Cart } from '../../utils/common';
import { ProductVariant } from '../../api/Product/Product';
import ProductsTable from './components/ProductsTable';
import Link from 'next/link';
import { DollarOutlined } from '@ant-design/icons';

type Props = {
  cookie?: Cookie;
}

type State = {
  cart: Cart[];
}
class CartPage extends Component<Props, State> {
  state = {
    cart: []
  }

  componentDidMount() {
    const cart = getUserCart();
    this.setState({ cart });
  }

  removeFromCart = (variant: ProductVariant, product: Product) => {
    let cart = getUserCart();
    cart = cart.filter((cart: Cart) => cart.variant.id !== variant.id);
    setUserCart(cart);
    notification.success({ message: 'Correcto', description: `Se ha removido ${product.name} ${variant.name} de tu carrito de compras.` });
    this.setState({ cart });
  }

  render() {
    const { cart } = this.state;
    return (<BaseLayout navbarTheme='dark'>
      <BaseMeta />
      <BaseHero title='Carrito de compras' backgroundImage='/assets/secondary-hero-bg.jpg' />
      <Container>
        <div className='cart-page' id='cart'>
          <Row >
            <ProductsTable cart={cart} onRemove={this.removeFromCart} />
            <div className='cart-page__payment_container'>
              <div className='cart-page__payment_button'>
                <Link href='/payment'>
                  <Button type='primary' >Proceder al pago <DollarOutlined /></Button>
                </Link>
              </div>
            </div>
          </Row>
        </div>
      </Container>
    </BaseLayout>);
  }
}

export default withCookie(CartPage);