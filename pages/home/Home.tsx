import React, { Component } from 'react';
import BaseLayout from '../shared/BaseLayout';
import './../styles/app.scss';
import BaseMeta from '../shared/BaseMeta';
import Hero from './components/Hero';
import DescriptionSection from './components/DescriptionSection';
import Container from '../shared/Container';
import Services, { HomeService } from './components/Services';
import { faStar, faFish, faPencilRuler, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import SingleSection from './components/SingleSection';

class Home extends Component {
  render() {
    const services: HomeService[] = [{
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
      <div className={'home'} id='home'>
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
        <Hero />
        <Container>
          <div className='home__sections'>
            <DescriptionSection
              imageUrl='/assets/home/section_1.jpg'
              title='Diseño de acuarios, Manufactura, Instalación'
              sectionText='Instalación'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio. Aliquam sit amet enim at nisi egestas bibendum pharetra et dui.'
              actionText='MAS INFORMACIÓN'
            />
            <DescriptionSection
              imageUrl='/assets/home/section_2.jpg'
              title='Servicio de Mantenimiento'
              sectionText='Mantenimiento'
              description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio. Aliquam sit amet enim at nisi egestas bibendum pharetra et dui.'
              actionText='MAS INFORMACIÓN'
              orientation='left'
            />
          </div>
        </Container>
        <Services services={services} />
        <SingleSection
          title='Especialista en acuarios a la medida, diseño en acuarios de lujo, instalación y mantenimiento.'
          description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer et ullamcorper odio. Aliquam sit amet enim at nisi egestas bibendum pharetra et dui. Fusce suscipit, dui quis volutpat ultricies, turpis dolor consectetur metus, eget consequat sapien neque nec odio. Integer nec mauris at enim aliquam pulvinar quis in felis.'
          actionText='Ver portafolio'
          sectionText='Visión'
        />
      </div>
    </BaseLayout>);
  }
}

export default Home;