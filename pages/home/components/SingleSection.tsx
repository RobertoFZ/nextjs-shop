import React from 'react';
import AppButton from '../../shared/AppButton';
import Container from '../../shared/Container';
import { Row, Col } from 'antd';
import Link from 'next/link';

const SingleSection = ({
  title,
  sectionText,
  description,
  actionText,
  actionLink
}: {
  title: string;
  sectionText: string;
  description: string;
  actionText: string;
  actionLink?: string;
}) => {
  return (<div className='single-section'>
    <Container>
      <Row>
        <Col xs={24} lg={{ span: 16 }}>
          <div className='single-section__info'>
            <p className='single-section__section'>{sectionText}</p>
            <h2 className='single-section__title'>{title}</h2>
            <p className='single-section__description'>{description}</p>
            <Link href='/contact'>
              <a><AppButton>{actionText}</AppButton></a>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  </div>)
}

export default SingleSection;