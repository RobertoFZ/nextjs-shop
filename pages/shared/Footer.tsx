import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
import Container from './Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return <Fragment>
    <div className='footer'>
      <Container>
        <Row gutter={32}>
          <Col xs={24} lg={12}>
            <h3 className='footer__section'>Nosotros</h3>
            <p className='footer__description'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio. Aliquam sit amet enim at nisi egestas bibendum pharetra et dui.          </p>
            <div className='footer__social_media'>
              <a href='https://facebook.com' target='_blank'><FontAwesomeIcon icon={faFacebookF} color='#8c8686' /></a>
              <a href='https://facebook.com' target='_blank'><FontAwesomeIcon icon={faInstagram} color='#8c8686' /></a>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <h3 className='footer__section'>Contácto</h3>
            <p className='footer__description'>
              <span>Dirección:</span><br />
              Calle 60 25 27
              Centro, Mérida, Yucatán 97000
            </p>
          </Col>
        </Row>
      </Container>
    </div>
    <div className='footer__signature_container'>
      <Container>
        <ul>
          <li>
            <img src='/logo.png' alt='logo' />
          </li>
          <li>
            <p><a href='https://franzet.com' target='_blank' rel='noreferrer'>Roberto Franco</a> © {new Date().getFullYear()}. Todos los derechos reservados, Términos de uso y Política de privacidad.</p>
          </li>
        </ul>
      </Container>
    </div>
  </Fragment>
}

export default Footer;