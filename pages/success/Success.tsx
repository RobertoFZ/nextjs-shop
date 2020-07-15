import React, { Component, Fragment } from 'react';
import './../styles/app.scss';
import BaseMeta from '../shared/BaseMeta';
import { CheckOutlined, CloseOutlined, LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Button, Spin, notification } from 'antd';
import OrderService from './../../api/Order';
import { Order } from './../../api/Order/Order';
import { withRouter, NextRouter } from 'next/router';
import Link from 'next/link';
import { setUserCart } from '../../utils/common';
import BaseLayout from '../shared/BaseLayout';
import BaseHero from '../shared/BaseHero';
import Container from '../shared/Container';

type Props = {
  router: NextRouter;
}

type State = {
  order?: Order;
  loading: boolean;
}

class Success extends Component<Props, State> {

  state = {
    order: undefined,
    loading: false
  }

  componentDidMount() {
    const urlPath = this.props.router.asPath;
    try {
      const order_id = urlPath.split('?id=')[1];
      this.getOrder(order_id);
    } catch (error) {
      this.props.router.push('/');
    }
  }

  getOrder = async (order_id: string) => {
    try {
      this.setState({ loading: true });
      const response: Order = await OrderService.get(order_id);
      if (response.openpay && response.openpay.status === 'completed') {
        setUserCart([]);
        try {
          await OrderService.sendMail(response.openpay.order_id);
        } catch (error) {
          notification.warning({ message: 'Ups', description: 'Tu compra fué exitosa pero no fue posible enviar el correo de confirmación.' })
        }
      } else if (response.data.method !== 'openpay') {
        setUserCart([]);
        try {
          await OrderService.sendMail(response.data.order_id);
        } catch (error) {
          notification.warning({ message: 'Ups', description: 'Tu compra fué exitosa pero no fue posible enviar el correo de confirmación.' })
        }
      }
      this.setState({ order: response, loading: false });
    } catch (error) {
      console.log(error.message);
      this.props.router.push('/');
    }
  }

  render() {
    const { loading, order } = this.state;
    return (<BaseLayout navbarTheme='dark'>
      <BaseMeta />
      <BaseHero title='Estatus del pago' backgroundImage='/assets/secondary-hero-bg.jpg' />
      <Container>
        {
          loading && <div className='success__loading_container'>
            <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
          </div>
        }
        {
          !loading && order && <Fragment>
            <Row className='success'>
              <Col xs={24}>
                {
                  (order.data.method === 'openpay' && order.openpay && order.openpay.status !== 'completed') && <Fragment>
                    <h2 className='success__subtitle'>Tu compra no pudo ser procesada</h2>
                    <h3 className='text-center'>
                      Parece que ocurrió un problema al completar el proceso de compra. <br />
                    No se logró realizar el cargo, te sugerimos intentar con otro método de pago. <br /><br />
                    Número de atención: <span>{process.env.supportPhone}</span>
                    </h3>
                    <div className='text-center' style={{ marginTop: '25px' }}>
                      <Link href='/cart'>
                        <Button type='primary' size='large'>¡Intentar de nuevo!</Button>
                      </Link>
                    </div>
                  </Fragment>
                }
                {
                  (order.data.method === 'paypal' || (order.openpay && order.openpay.status === 'completed')) && <Fragment>
                    <h2 className='success__subtitle'>¡Tu compra ya está siendo procesada!</h2>
                    <h3 className='text-center'>
                      Muchas gracias por comprar con nosotros, el identificador de tu orden es: <br /><br />
                      <span>{order.data.method === 'openpay' ? order.openpay.order_id : order.data.order_id}</span><br /><br />
                    Te sugerimos guardar el identificador de tu orden para cualquier tipo de aclaración, <br />de igual forma
              se te ha enviado un correo electrónico a <br />  <span>{order.data.customer.email}</span> con la información de tu compra.
              <br /><br />
              Número de atención: <span>{process.env.supportPhone}</span>
                    </h3>
                    <div className='text-center' style={{ marginTop: '25px' }}>
                      <Link href='/shop'>
                        <Button type='primary' size='large'>¡Continuar comprando!</Button>
                      </Link>
                    </div>
                  </Fragment>
                }
              </Col>
            </Row>
          </Fragment>
        }
      </Container>
    </BaseLayout>);
  }
}

export default withRouter(Success);