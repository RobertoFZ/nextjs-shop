import React from 'react';
import { Button } from 'antd';
import Container from '../../shared/Container';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Hero = () => {
  return (<div className='hero_section'>
    <div className='hero_section__title_container'>
      <Container>
        <h1>Instalación<br />y Mantenimiento<br />de Acuarios</h1>
        <div className='hero_section__buttons_container'>
          <Button className='hero_section__button' type='primary' onClick={() => true}>
            CONTÁCTANOS
          </Button>
        </div>
        <div className='hero_section__social_media'>
          <a href='https://facebook.com' target='_blank'><FontAwesomeIcon icon={faFacebookF} color='#8c8686' /></a>
          <a href='https://instagram.com' target='_blank'><FontAwesomeIcon icon={faInstagram} color='#8c8686' /></a>
        </div>
      </Container>
    </div>
  </div>);
}
export default Hero;