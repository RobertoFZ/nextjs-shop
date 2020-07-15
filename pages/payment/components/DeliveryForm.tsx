import React, { Component } from 'react';
import { Row, Col, Form, Input } from 'antd';

export type DeliveryData = {
  name: string;
  email: string;
  address: string;
  colony: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
}

type Props = {
  onChange: Function;
  data: DeliveryData;
}
class DeliveryForm extends Component<Props> {
  render() {
    const { data } = this.props;
    return (
      <Form className='delivery_form' initialValues={data}>
        <h2>Información de envío</h2>
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Debe escribir su nombre' }]}
        >
          <Input placeholder='Nombre completo' onBlur={(event: any) => this.props.onChange('name', event.target.value)} />
        </Form.Item>
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Debe escribir un correo electrónico' }]}
        >
          <Input placeholder='Correo electrónico' type='email' onBlur={(event: any) => this.props.onChange('email', event.target.value)} />
        </Form.Item>
        <Form.Item
          name='address'
          rules={[{ required: true, message: 'Debe escribir su dirección' }]}
        >
          <Input placeholder='Dirección, número, cruzamientos' type='text' onBlur={(event: any) => this.props.onChange('address', event.target.value)} />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={12}>
            <Form.Item
              name='colony'
              rules={[{ required: true, message: 'Debe escribir su colonia' }]}
            >
              <Input placeholder='Colonia' type='text' onBlur={(event: any) => this.props.onChange('colony', event.target.value)} />
            </Form.Item>
            <Form.Item
              name='state'
              rules={[{ required: true, message: 'Debe escribir el estado en el que vive' }]}
            >
              <Input placeholder='Estado' type='text' onBlur={(event: any) => this.props.onChange('state', event.target.value)} />
            </Form.Item>
            <Form.Item
              name='country'
              rules={[{ required: true, message: 'Debe escribir el país donde vive' }]}
            >
              <Input placeholder='País' type='text' onBlur={(event: any) => this.props.onChange('country', event.target.value)} />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              name='city'
              rules={[{ required: true, message: 'Debe escribir su ciudad' }]}
            >
              <Input placeholder='Ciudad' type='text' onBlur={(event: any) => this.props.onChange('city', event.target.value)} />
            </Form.Item>
            <Form.Item
              name='zip'
              rules={[{ required: true, message: 'Debe escribir su código postal' }]}
            >
              <Input placeholder='Código postal' type='text' onBlur={(event: any) => this.props.onChange('zip', event.target.value)} />
            </Form.Item>
            <Form.Item
              name='phone'
              rules={[{ required: true, message: 'Debe escribir su teléfono' }]}
            >
              <Input placeholder='Teléfono o celular' type='phone' onBlur={(event: any) => this.props.onChange('phone', event.target.value)} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

export default DeliveryForm;