import React, { Component } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';

declare global {
  interface Window {
    OpenPay: any;
    $: any;
  }
}

type Props = {
  onSubmit: Function;
  onChange: Function;
  onBackPressed: Function;
  data: CardData;
  loading?: boolean;
}
type State = {
  deviceSessionId: string;
}

export type CardData = {
  card: string;
  holder: string;
  month: string;
  year: string;
  cvc: string;
}

class CreditCardForm extends Component<Props, State> {

  state = {
    deviceSessionId: ''
  }

  componentDidMount() {
    window.$(document).ready(() => {
      window.OpenPay.setId(process.env.openPayId);
      window.OpenPay.setApiKey(process.env.openPayPublicKey);
      window.OpenPay.setSandboxMode(Boolean(Number(process.env.openPaySandboxActive)));
      let deviceSessionId = window.OpenPay.deviceData.setup('payment-form', 'deviceId');

      this.setState({ deviceSessionId });
    });
  }

  handleSubmit = (values: any) => {
    const { deviceSessionId } = this.state;
    this.props.onSubmit(values, deviceSessionId);
  }

  render() {
    const { data } = this.props;
    return (
      <Form id='payment-form' className='card_form' onFinish={this.handleSubmit} initialValues={data}>
        <h2>Información de la tarjeta</h2>
        <p>Por favor ingresa los datos de tu tarjeta.</p>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name='holder'
              rules={[{ required: true, message: 'Debe escribir su nombre' }]}
            >
              <Input placeholder='Nombre del titular' data-openpay-card='holder_name' onBlur={(event: any) => this.props.onChange('holder', event.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              name='card'
              rules={[{ required: true, message: 'Debe escribir su nombre' }]}
            >
              <Input placeholder='Número de tarjeta' data-openpay-card='card_number' onBlur={(event: any) => this.props.onChange('card', event.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name='month'
              rules={[{ required: true, message: 'Debe escribir su colonia' }]}
            >
              <Input placeholder='Mes de expiración' type='text' data-openpay-card='expiration_month' onBlur={(event: any) => this.props.onChange('month', event.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name='year'
              rules={[{ required: true, message: 'Debe escribir el estado en el que vive' }]}
            >
              <Input placeholder='Año de expiración' type='text' data-openpay-card='expiration_year' onBlur={(event: any) => this.props.onChange('year', event.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={8}>
            <Form.Item
              name='cvc'
              rules={[{ required: true, message: 'Debe escribir su ciudad' }]}
            >
              <Input placeholder='Código de seguridad' type='text' autoComplete='off' data-openpay-card='cvv2' onBlur={(event: any) => this.props.onChange('cvc', event.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='card_form__actions'>
          <Col xs={12}>
            <Button className='payment__card_button' type='primary' htmlType='submit' loading={this.props.loading}>Confirmar compra</Button>
          </Col>
          <Col xs={12}>
            {
              !this.props.loading && <Button className='payment__card_button' type='default' onClick={() => this.props.onBackPressed()}>Verificar datos de envío</Button>
            }
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <div className='card_form__provider_info'>
              <img src='/cards/openpay_logo.png' alt='openpay logo' />
            </div>
            <div className='card_form__cards'>
              <img src='/cards/visa.png' />
              <img src='/cards/mastercard.png' />
              <img src='/cards/express.png' />
              <img src='/cards/discover.png' />
            </div>
            <div className='card_form__banks'>
              <img src='/cards/bancomer.png' />
              <img src='/cards/santander.png' />
              <img src='/cards/scotiabank.png' />
              <img src='/cards/hsbc.png' />
              <img src='/cards/inbursa.png' />
              <img src='/cards/ixe.png' />
            </div>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default CreditCardForm;