import React, { Component } from 'react';
import { Form, Select, message, Button, notification, Alert } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import AppInput from '../../../shared/AppInput';
import { ProductVariant, Product } from '../../../../api/Product/Product';
import { getUserCart, Cart, setUserCart } from '../../../../utils/common';
import Router from 'next/router';
import { withCookie, Cookie } from 'next-cookie';
import Link from 'next/link';

const Option = Select.Option;

type Props = {
  product?: Product;
  cookie?: Cookie;
}

type State = {
  selectedVariant?: number;
}

type FormValues = {
  quantity: number;
  variant: string;
}

class ProductForm extends Component<Props, State> {
  form: any;
  state = {
    selectedVariant: undefined,
  }

  buildSelectComponent = () => {
    const { product } = this.props;
    return <Select className='product__variants' onChange={this.handleVariantChange}>
      <Option value='none' disabled>Escoja un elemento</Option>
      {product.product_variants.map((variant: ProductVariant) => <Option key={variant.id} value={variant.id}>{variant.name}</Option>)}
    </Select>
  }

  handleVariantChange = (value: any) => {
    this.setState({ selectedVariant: value === 'none' ? undefined : Number(value) });
  }

  addToCart = (values: FormValues) => {
    const { product } = this.props;
    if (values.variant === 'none') {
      message.warning('Debes seleccionar la presentación que deseas comprar', 4);
    }
    // We found the variant for display data pruporses
    const variant = product.product_variants.find((variant: ProductVariant) => variant.id === Number(values.variant));

    if (this.props.cookie && variant) {
      const cart = getUserCart();
      // We verify if already exist the product in the cart:
      const productFound = cart.findIndex((cart: Cart) => cart.product.id === product.id && cart.variant.id === variant.id);

      if (productFound !== -1) {
        cart[productFound].quantity += values.quantity;
      } else {
        cart.push({
          product,
          variant,
          quantity: values.quantity
        });
      }
      setUserCart(cart);
      this.showSuccessNotification('¡Correcto!', `Se ha añadido ${product.name} ${variant ? `${variant.name} ` : ''}a tu carrito de compras.`);
      this.setState({ selectedVariant: undefined });
      if (this.form) {
        this.form.resetFields();
      }
    }
  }

  goToCart = () => {
    Router.push('/cart');
  }

  showSuccessNotification = (title: string, message: string) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button type='primary' onClick={() => {
        notification.close(key);
        this.goToCart();
      }}>
        Pagar <ArrowRightOutlined />
      </Button>
    );
    notification.success({
      message: title,
      description: message,
      btn,
      key,
    });
  }

  render() {
    const { product } = this.props;
    const { selectedVariant } = this.state;
    if (!product) return null;

    const variant = product ? product.product_variants.find((variant: ProductVariant) => variant.id === selectedVariant) : undefined;

    const initialValues = {
      variant: 'none',
      quantity: 1,
    }

    return (<Form initialValues={initialValues} className='product-form' onFinish={this.addToCart} ref={(ref) => this.form = ref}>
      <AppInput
        name='variant'
        label='Escoger'
        rules={[{ required: true, message: 'Por favor escoja un producto' }]}
        component={this.buildSelectComponent()}
      />
      <div className='product-form__quantity_container'>
        <AppInput
          className='product-form__quantity'
          label='Cantidad'
          name='quantity'
          rules={[{ required: true, message: 'Escoja una cantidad' }]}
          type='number'
        />
        <Button htmlType='submit' type='primary' disabled={variant && variant.use_stock && variant.stock === 0}>Agregar al carrito</Button>
      </div>
      <br/>
      <br/>
      <Link href='/cart'>
        <Button type='primary' style={{ width: '100%' }}>Ir al carrito</Button>
      </Link>
      {
        variant && variant.use_stock && variant.stock === 0 && <Alert
          message='No disponible'
          type="warning"
          closable={false}
        />
      }
    </Form>)
  }
}

export default withCookie(ProductForm);