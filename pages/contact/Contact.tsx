import React, { Component } from 'react';
import BaseLayout from '../shared/BaseLayout';
import BaseMeta from '../shared/BaseMeta';
import Container from '../shared/Container';
import BaseHero from '../shared/BaseHero';
import { Form, Row, Col, message } from 'antd';
import AppInput from '../shared/AppInput';
import AppButton from '../shared/AppButton';
import ContactService from '../../api/Contact';

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
}

type State = {
  loading: boolean;
}

class Contact extends Component<{}, State> {
  form;
  state = {
    loading: false,
  }

  onSubmit = async (values: FormValues) => {
    try {
      this.setState({ loading: true });
      await ContactService.send(values);
      this.form.resetFields();
      this.setState({ loading: false });
    } catch (error) {
      message.error('Ocurrió un problema al enviar tu mensaje, intenta de nuevo.');
      this.setState({ loading: false });
    }
  }
  render() {
    const { loading } = this.state;
    return (<BaseLayout navbarTheme='dark'>
      <BaseHero title='Contacto' />
      <BaseMeta
        title='Franzet | Acuario - Contacto'
        description='Todo para tu acuario al alcance de unos cuantos clicks.'
        subject='Franzet | Acuario - Contacto'
        openGraph={{
          title: 'Franzet | Acuario - Contacto',
          type: 'pets',
          url: 'https://acuario.franzet.com',
          image: `${process.env.applicationUrl}/logo.png`,
          description: 'Todo para tu acuario al alcance de unos cuantos clicks.'
        }}
      />
      <div className={'contact'} id='contact'>
        <Container>
          <div className='contact__sections'>
            <h2 className='contact__title'>Déjanos un mensaje</h2>
            <Form onFinish={this.onSubmit} ref={(ref) => this.form = ref}>
              <Row gutter={36}>
                <Col xs={24} md={24} xxl={{ span: 20, offset: 2 }}>
                  <AppInput
                    name='name'
                    placeholder='Tu nombre'
                    rules={[{ required: true, message: 'Escribe tu nombre' }]}
                  />
                </Col>
                <Col xs={24} md={12} xxl={{ span: 10, offset: 2 }}>
                  <AppInput
                    name='email'
                    placeholder='Tu correo electrónico'
                    rules={[{ required: true, message: 'Escribe tu correo electrónico' }]}
                  />
                </Col>
                <Col xs={24} md={12} xxl={10}>
                  <AppInput
                    name='phone'
                    placeholder='Tu número telefónico'
                    rules={[{ required: true, message: 'Escribe tu teléfono' }]}
                  />
                </Col>
                <Col xs={24} xxl={{ span: 20, offset: 2 }}>
                  <AppInput
                    name='message'
                    type='textarea'
                    placeholder='Escribe tu mensaje'
                    rules={[{ required: true, message: 'Escribe tu mensaje' }]}
                    rows={5}
                  />
                  <div className='text-right'>
                    <AppButton htmlType='submit' className='contact__button' loading={loading}>ENVIAR</AppButton>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </Container>
      </div>
    </BaseLayout>);
  }
}

export default Contact;