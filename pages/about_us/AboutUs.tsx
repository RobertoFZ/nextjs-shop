import React, { Component } from 'react';
import BaseLayout from '../shared/BaseLayout';
import BaseMeta from '../shared/BaseMeta';
import Container from '../shared/Container';
import BaseHero from '../shared/BaseHero';
import DescriptionSection from './components/DescriptionSection';
import { faStar, faFish, faPencilRuler, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import Services, { AboutService } from './components/Services';

class AboutUs extends Component {
  render() {
    const services: AboutService[] = [{
      icon: faStar,
      title: 'Mantenimiento',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio.',
      actionText: 'MÁS INFORMACIÓN',
      actionLink: '/'
    }, {
      icon: faFish,
      title: 'Enfermería',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio.',
      actionText: 'MÁS INFORMACIÓN',
      actionLink: '/'
    }, {
      icon: faPencilRuler,
      title: 'Diseño e Instalación',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio.',
      actionText: 'MÁS INFORMACIÓN',
      actionLink: '/'
    }, {
      icon: faCommentAlt,
      title: 'Consultoría',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio.',
      actionText: 'MÁS INFORMACIÓN',
      actionLink: '/'
    }]
    return (<BaseLayout navbarTheme='dark'>
      <BaseHero title='Nosotros' />
      <BaseMeta
        title='Franzet | Acuario - Nosotros'
        description='Todo para tu acuario al alcance de unos cuantos clicks.'
        subject='Franzet | Acuario - Nosotros'
        openGraph={{
          title: 'Franzet | Acuario - Nosotros',
          type: 'pets',
          url: 'https://acuario.franzet.com',
          image: `${process.env.applicationUrl}/logo.png`,
          description: 'Todo para tu acuario al alcance de unos cuantos clicks.'
        }}
      />
      <div className={'about-us'} id='about-us'>
        <Container>
          <div className='about-us__sections'>
            <DescriptionSection
              imageUrl='/assets/about/about_1.jpg'
              title='Especialistas en Diseño de Acuarios, Manufactura e Instalación'
              sectionText='¿Quienes somos?'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio. Aliquam sit amet enim at nisi egestas bibendum pharetra et dui. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              actionText='CONTÁCTANOS'
              actionLink='/contact'
              orientation='left'
            />
          </div>
        </Container>
        <Services services={services} />
      </div>
    </BaseLayout>);
  }
}

export default AboutUs;