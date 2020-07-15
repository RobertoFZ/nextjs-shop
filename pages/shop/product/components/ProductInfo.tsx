import React from 'react';
import { Product } from '../../../../api/Product/Product';
import { formatMoney } from '../../../../utils/common';

const ProductInfo = ({ product }: { product: Product }) => {
  return (<div className='product-info'>
    <h2 className='product-info__price'>${formatMoney(product.price)}</h2>
    <h2 className='product-info__name'>{product.name}</h2>
    <p className='product-info__description'>{product.description}</p>
  </div>)
}

export default ProductInfo;