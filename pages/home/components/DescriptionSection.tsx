import React from 'react';
import { Row, Col } from 'antd';
import AppButton from '../../shared/AppButton';

const DescriptionSection = ({
  imageUrl,
  title,
  sectionText,
  description,
  actionText,
  actionLink,
  orientation = 'right'
}: {
  imageUrl: string;
  title: string;
  sectionText: string;
  description: string;
  actionText: string;
  actionLink?: string;
  orientation?: 'right' | 'left';
}) => {
  const Image = <img className='description-section__image' src={imageUrl} />;
  const Info = <div className='description-section__info'>
    <p className='description-section__section'>{sectionText}</p>
    <h2 className='description-section__title'>{title}</h2>
    <p className='description-section__description'>{description}</p>
    <AppButton>{actionText}</AppButton>
  </div>;
  return <div className='description-section'>
    <Row justify='center' align='middle'>
      <Col xs={{ span: 24, order: orientation === 'right' ? 1 : 2 }} lg={{ span: 12, order: 1 }}>
        {orientation === 'right' ? Image : Info}
      </Col>
      <Col xs={{ span: 24, order: orientation === 'right' ? 2 : 1 }} lg={{ span: 12, order: 2 }}>
        {orientation === 'right' ? Info : Image}
      </Col>
    </Row>
  </div>;
}

export default DescriptionSection;