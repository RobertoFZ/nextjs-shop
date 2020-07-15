import React from 'react';
import { Button } from 'antd';
import Container from '../../shared/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

const Hero = () => {
  return (<div className='hero_section'>
    <div className='hero_section__title_container'>
      <Container>
        <h1>Instalación<br />y Mantenimiento<br />de Acuarios</h1>
        <div className='hero_section__buttons_container'>
          <Link href='/shop'>
            <Button className='hero_section__button' type='primary' onClick={() => true}>
              IR A COMPRAR
          </Button>
          </Link>
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