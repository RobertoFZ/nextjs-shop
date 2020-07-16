import React from 'react';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import AppButton from '../../shared/AppButton';
import Container from '../../shared/Container';

export type AboutService = {
  icon: IconDefinition;
  title: string;
  description: string;
  actionLink: string;
  actionText: string;
}

const Services = ({
  services
}: {
  services: AboutService[]
}) => {
  if (!services) return null;
  return (<div className='services'>
    <div>
      <h2 className='services__title'>Somos especialistas</h2>
      <Container>
        <Row gutter={16} justify='center'>
          {
            services.map((service: AboutService) => <Col key={service.title} xs={24} md={12} lg={6}>
              <div className='services__service'>
                <div className='services__service__link'>
                  <div className='services__service__link-href'>
                    <Link href='/contact'>
                      <FontAwesomeIcon icon={service.icon} color='#37abbd' />
                    </Link>
                  </div>
                </div>
                <h3 className='services__service__title'>{service.title}</h3>
                <p className='services__service__description'>{service.description}</p>
                <Link href='/contact'>
                  <AppButton className='services__link' type='link'>{service.actionText}</AppButton>
                </Link>
              </div>
            </Col>)
          }
        </Row>
      </Container>
    </div>
  </div>)
}

export default Services;