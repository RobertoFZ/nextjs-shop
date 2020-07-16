import React from 'react';
import { Row, Col } from 'antd';
import { Product } from '../../../api/Product/Product';
import ProductRow from './ProductRow';
import Loader from '../../shared/Loader';

const ProductsList = ({
  products = [],
  loading = false,
}: {
  products?: Product[];
  loading?: boolean;
}) => {
  return (<Row className='products-list' gutter={36}>
    <Loader loading={loading} size='large' />
    {!loading && products.map((product: Product) => <Col key={product.id} xs={24} md={12} lg={8}>
      <ProductRow product={product} />
    </Col>)}
  </Row>);
}

export default ProductsList