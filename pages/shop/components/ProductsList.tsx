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
  console.log(products)
  return (<Row className='products-list'>
    <Loader loading={loading} size='large' />
    {products.map((product: Product) => <Col key={product.id} xs={8}>
      <ProductRow product={product} />
    </Col>)}
  </Row>);
}

export default ProductsList