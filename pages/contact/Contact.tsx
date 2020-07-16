import React, { Component } from 'react';
import BaseLayout from '../shared/BaseLayout';
import BaseMeta from '../shared/BaseMeta';
import Container from '../shared/Container';
import BaseHero from '../shared/BaseHero';
import { Form, Row, Col } from 'antd';
import AppInput from '../shared/AppInput';
import AppButton from '../shared/AppButton';

class Contact extends Component {
  render() {
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
            <Form>
              <Row gutter={36}>
                <Col xs={24} md={12} xxl={{ span: 10, offset: 2 }}>
                  <AppInput
                    name='name'
                    placeholder='Tu nombre'
                  />
                </Col>
                <Col xs={24} md={12} xxl={10}>
                  <AppInput
                    name='email'
                    placeholder='Tu correo electrónico'
                  />
                </Col>
                <Col xs={24} xxl={{ span: 20, offset: 2 }}>
                  <AppInput
                    name='message'
                    type='textarea'
                    placeholder='Escribe tu mensaje'
                    rows={5}
                  />
                  <div className='text-right'>
                    <AppButton htmlType='submit' className='contact__button'>ENVIAR</AppButton>
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