import React, { Component, Fragment } from 'react';
import BaseLayout from '../shared/BaseLayout';
import './../styles/app.scss';
import { Row, Col, notification, Button, Progress, Divider } from 'antd';
import BaseMeta from '../shared/BaseMeta';
import BaseHero from '../shared/BaseHero';
import Container from '../shared/Container';
import Router, { NextRouter, withRouter } from 'next/router';
import { Cookie, withCookie } from 'next-cookie';
import { getUserCart, Cart, formatMoney } from '../../utils/common';
import DeliveryForm, { DeliveryData } from './components/DeliveryForm';
import WithPayPal, { PayPalProps } from '../shared/WithPayPal';
import CreditCardForm, { CardData } from './components/CreditCardForm';
import { OrderRequest, OrderResponse } from '../../api/Order/Order';
import OrderService from '../../api/Order';
import PurchaseInfo from './components/PurchaseInfo';
import DeliveryMethod from './components/DeliveryMethod';
import { CreditCardOutlined } from '@ant-design/icons';
import PackageModal from '../shared/PackageModal';

declare global {
  interface Window {
    OpenPay: any;
    $: any;
  }
}

type Props = {
  router: NextRouter;
  cookie?: Cookie;
  paypal?: PayPalProps;
}

type State = {
  cart: Cart[];
  showDeliveryForm: boolean;
  showCardForm: boolean;
  deliveryData: DeliveryData,
  cardData: CardData;
  loading: boolean;
  selectedPackage?: Cart[];
  showModal: boolean;
  showFeedback: boolean;
  redirectPercentage: number;
  paypalProcessed: boolean;
  processingPayPal: boolean;
}

class Payment extends Component<Props, State> {
  interval: any;

  state = {
    cart: [],
    showDeliveryForm: true,
    showCardForm: false,
    deliveryData: {
      name: '',
      email: '',
      address: '',
      colony: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      phone: ''
    },
    cardData: {
      card: '',
      holder: '',
      month: '',
      year: '',
      cvc: ''
    },
    loading: false,
    selectedPackage: undefined,
    showModal: false,
    redirectPercentage: 0,
    showFeedback: false,
    paypalProcessed: false,
    processingPayPal: false
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.paypal && this.props.paypal.payPalReady && !this.props.paypal.buttonLoaded) {
      this.createPayPalButton();
    }
    if (this.props.paypal && this.props.paypal.order && !this.state.paypalProcessed) {
      this.setState({ paypalProcessed: true });
      this.createPayPalOrder(this.props.paypal.order);
      this.props.paypal.resetOrder();
    }
  }

  componentDidMount() {
    const cart = getUserCart();
    this.setState({ cart });
  }

  createPayPalButton = () => {
    this.props.paypal!.initPayPal('paypal-button',
      {
        amount: {
          value: (this.getSubtotal() + this.getDeliveryCost()).toString(),
          currency_code: 'MXN'
        }
      });
    this.props.paypal!.setValidate(this.validatePayPal);
  }

  onPayPalClick = () => {
    this.setState({ loading: true });
  }

  createPayPalOrder = async (paypalOrder: any) => {
    const { cart, deliveryData } = this.state;
    let products = cart.map((cart: Cart) => {
      return {
        product_variant_id: cart.variant.id,
        quantity: cart.quantity,
      }
    });

    let order: OrderRequest = {
      products,
      customer: deliveryData,
      paypal_order_id: paypalOrder.orderID
    };

    try {
      this.setState({ loading: true, showFeedback: true, processingPayPal: true });
      const paymentResponse = await OrderService.make(order, 'paypal');
      this.setState({ loading: false }, () => this.initPercentajeLoading(paymentResponse));
    } catch (error) {
      notification.error({ message: 'Error con tu pago', description: error.message, duration: 10 });
      this.setState({ loading: false, showDeliveryForm: true, showFeedback: false });
    }
  }

  getSubtotal = () => {
    const { cart } = this.state;
    let subtotal = 0;
    cart.forEach((cart: Cart) => {
      subtotal += (cart.variant.price || cart.product.price) * cart.quantity;
    });
    return subtotal;
  }

  getProductsCount = () => {
    const { cart } = this.state;
    let productsCount = 0;
    cart.forEach((cart: Cart) => {
      productsCount += cart.quantity;
    });
    return productsCount;
  }

  validatePayPal = () => {
    const { deliveryData } = this.state;
    let valid = false;
    const keys = Object.keys(deliveryData);
    for (let i = 0; i < keys.length; i++) {
      const value = deliveryData[keys[i]];
      if (this.isBlank(value) || this.isEmpty(value)) {
        notification.error({ message: 'Error', description: this.getErrorMessage(keys[i]) });
        valid = false;
        break;
      }
      valid = true;
    }
    return valid;
  }

  validateDeliveryForm = () => {
    const { deliveryData } = this.state;
    let valid = false;
    const keys = Object.keys(deliveryData);
    for (let i = 0; i < keys.length; i++) {
      const value = deliveryData[keys[i]];
      if (this.isBlank(value) || this.isEmpty(value)) {
        notification.error({ message: 'Error', description: this.getErrorMessage(keys[i]) });
        valid = false;
        break;
      }
      valid = true;
    }

    if (valid) {
      this.setState({ showDeliveryForm: false, showCardForm: true }, () => this.smothScroll('#container'));
    }
  }

  getErrorMessage = (value: string) => {
    switch (value) {
      case 'name':
        return 'Tu nombre no puede estar vacío.';
      case 'email':
        return 'Debes escribir tu correo electrónico.';
      case 'address':
        return 'Debes escribir una dirección para tu envío.';
      case 'colony':
        return 'Debes escribir tu colonia.';
      case 'city':
        return 'Debes escribir tu ciudad.';
      case 'state':
        return 'Debes escribir tu estado.';
      case 'zip':
        return 'Debes escribir tu código postal.';
      case 'country':
        return 'Debes escribir tu país.';
      case 'phone':
        return 'Debes escribir tu teléfono';
      default:
        return '';
    }
  }

  handleCardFormSubmit = (values: CardData, deviceSessionId: string) => {
    this.setState({ loading: true }, () => {
      window.OpenPay.token.extractFormAndCreate('payment-form', ((response: any) => this.openPaySuccess(response, deviceSessionId)), this.openPayError);
    });
  }

  openPaySuccess = async (response: any, deviceSessionId: string) => {
    const { cart, deliveryData } = this.state;
    const { id: token_id } = response.data;
    let products = cart.map((cart: Cart) => {
      return {
        product_variant_id: cart.variant.id,
        quantity: cart.quantity,
      }
    });

    let order: OrderRequest = {
      products,
      token_id,
      customer: deliveryData,
      device_id: deviceSessionId
    };

    try {
      const paymentResponse = await OrderService.make(order);
      this.setState({ loading: false, showFeedback: true }, () => this.initPercentajeLoading(paymentResponse));
    } catch (error) {
      notification.error({ message: 'Error con tu pago', description: error.message, duration: 10 });
      this.setState({ loading: false });
    }
  }

  redirectTo3dSecureUrl = (paymentResponse: OrderResponse) => {
    window.location.href = paymentResponse.openpay_3d_secure_url;
  }

  openPayError = (response: any) => {
    const { description, error_code } = response.data;
    console.log(description);
    notification.error({ message: 'Error con tu tarjeta', description: this.getOpenPayError(error_code) });
    this.setState({ loading: false });
  }

  handleDeliveryValueChange = (key: string, value: any) => {
    let { deliveryData } = this.state;
    deliveryData[key] = value;
    this.setState({ deliveryData });
  }

  handleCardValueChange = (key: string, value: any) => {
    let { cardData } = this.state;
    cardData[key] = value;
    this.setState({ cardData });
  }

  isEmpty = (value: string) => {
    return (!value || 0 === value.length);
  }

  isBlank = (value: string) => {
    return (!value || /^\s*$/.test(value));
  }

  getDeliveryCost = () => {
    let cost = 0;
    const packages = this.getProductsByBusiness();
    packages.forEach((packageItem: Cart[]) => {
      packageItem.forEach((cart: Cart) => {
        cost += cart.variant.shipping_price || cart.product.shipping_price;
      })
    })
    return cost;
  }

  getOpenPayError = (error_code: number) => {
    let message = '';
    switch (error_code) {
      case 1001:
        message = 'El código de seguridad debe ser de 3 dígitos.';
        break;
      case 2005:
        message = 'La fecha de vencimiento de la tarjeta es inválida.';
        break;
      case 2009:
        message = 'El código de seguridad es inválido.';
        break;
      case 3001:
        message = 'Tarjeta declinada.';
        break;
      case 3002:
        message = 'La tarjeta ha expirado.';
        break;
      case 3003:
        message = 'La tarjeta no tiene saldo suficiente.';
        break;
      case 3004:
        message = 'La tarjeta ha sido reportada como robada.';
        break;
      case 3005:
        message = 'La tarjeta ha sido rechazada por el sistema antifraude.';
        break;
      case 3010:
        message = 'La tarjeta ha sido restringida por el banco.';
        break;
      default:
        message = 'Ha ocurrido un error con la tarjeta, por favor intente con otro método de pago.';
        break;
    }
    return message;
  }

  getProductsByBusiness = () => {
    const { cart } = this.state;
    let productsByBusiness = {};
    let packages = [];
    const business_ids: number[] = cart.reduce((unique: number[], item: Cart) => {
      return unique.includes(item.product.business_id) ? unique : [...unique, item.product.business_id];
    }, []);

    business_ids.forEach((id: number) => {
      productsByBusiness[id] = cart.filter((cart: Cart) => cart.product.business_id === id);
    });
    Object.keys(productsByBusiness).forEach((key: string) => {
      packages.push(productsByBusiness[key]);
    });
    return packages;
  }

  getPackageCost = (packageItem: Cart[]) => {
    return packageItem.reduce((total: number, cart: Cart) => {
      return total += cart.variant.shipping_price || cart.product.shipping_price;
    }, 0);
  }

  showPackage = (packageItem: Cart[]) => {
    this.setState({ selectedPackage: packageItem, showModal: true });
  }

  handleModalOpen = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  initPercentajeLoading = (paymentResponse: OrderResponse) => {
    const context = this;
    this.interval = setInterval(() => {
      const { redirectPercentage } = context.state;
      context.setState({ redirectPercentage: redirectPercentage + 1 });
      if (redirectPercentage === 100) {
        clearInterval(this.interval);
        setTimeout(() => {
          if (paymentResponse.method === 'openpay') {
            this.redirectTo3dSecureUrl(paymentResponse)
          } else {
            Router.push(`/success?id=${paymentResponse.paypal_order}`);
          }
        }, 1000);
      }
    }, 50);
  }

  smothScroll = (selector: string) => {
    let target = window.$(selector);
    window.$('html, body').animate({
      scrollTop: target.offset().top
    }, 1000, function () {
      // Callback after animation
      // Must change focus!
      var $target = window.$(target);
      $target.focus();
      if ($target.is(":focus")) { // Checking if the target was focused
        return false;
      } else {
        $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
        $target.focus(); // Set focus again
      };
    });
  }

  render() {
    const {
      showDeliveryForm,
      showCardForm,
      deliveryData,
      cardData,
      loading,
      showModal,
      selectedPackage,
      showFeedback,
      redirectPercentage,
      processingPayPal
    } = this.state;

    return (<BaseLayout navbarTheme='dark'>
      <BaseMeta
        title='Franzet | Acuario'
        description='Todo para tu acuario al alcance de unos cuantos clicks.'
        subject='Franzet | Acuario'
        openGraph={{
          title: 'Franzet | Acuario',
          type: 'pets',
          url: 'https://acuario.franzet.com',
          image: `${process.env.applicationUrl}/logo.png`,
          description: 'Todo para tu acuario al alcance de unos cuantos clicks.'
        }}
      />
      <BaseHero title='Paga tu compra' backgroundImage='/assets/secondary-hero-bg.jpg' />
      <Container>
        <Row className='payment' gutter={36} id='container'>
          <PackageModal show={showModal} packageItem={selectedPackage} onClose={this.handleModalOpen} />

          <Col xs={24} lg={14}>
            <div className='payment__delivery_form'>
              {
                showDeliveryForm && !showFeedback && <DeliveryForm data={deliveryData} onChange={this.handleDeliveryValueChange} />
              }
              {
                showCardForm && !showFeedback && <CreditCardForm
                  loading={loading}
                  onChange={this.handleCardValueChange}
                  data={cardData}
                  onSubmit={this.handleCardFormSubmit}
                  onBackPressed={() => this.setState({ showCardForm: false, showDeliveryForm: true })}
                />
              }
              {
                showFeedback && <div className='text-center'>
                  <h2 className='text-center'>{processingPayPal ? 'Procesando tu pago con PayPal' : 'Redireccionando al portal del pago'}</h2>
                  <Progress type="circle" percent={redirectPercentage} />
                </div>
              }
            </div>
          </Col>
          {
            <Col xs={24} lg={10}>
              <div className='payment__purchase_info'>
                <h2>Información de la compra</h2>
                <PurchaseInfo subtotal={this.getSubtotal()} productsCount={this.getProductsCount()} />
                {
                  this.getProductsByBusiness().map((item: Cart[], index: number) => <Fragment key={index}>
                    <Divider />
                    <DeliveryMethod
                      packageItem={item}
                      cost={this.getPackageCost(item)}
                      number={index + 1}
                      onClick={this.showPackage}
                    />
                  </Fragment>)
                }
                <Divider />
                <Row>
                  <Col xs={8}>
                    Total:
                  </Col>
                  <Col xs={16}>
                    <p className='payment__total'>
                      <span>${formatMoney(this.getSubtotal() + this.getDeliveryCost())}</span>
                    </p>
                  </Col>
                  {
                    showDeliveryForm && <Col xs={24}>
                      {
                        process.env.enableCardPayments === 'true' && <Button className='payment__card_button' shape='round' type='primary' onClick={this.validateDeliveryForm}>Pago con tarjeta <CreditCardOutlined /></Button>
                      }
                      <div id='paypal-button' className='payment__paypal'></div>
                    </Col>
                  }
                </Row>
              </div>
            </Col>
          }
        </Row>
      </Container>
    </BaseLayout>);
  }
}

export default WithPayPal(withRouter(withCookie(Payment)));