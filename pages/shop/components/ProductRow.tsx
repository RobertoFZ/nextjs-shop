import React from 'react';
import { Product } from '../../../api/Product/Product';
import { formatMoney } from '../../../utils/common';
import Link from 'next/link';

const ProductRow = ({
  product
}: {
  product: Product;
}) => {
  return (<div className='product'>
    <Link href={`/shop/product/${product.id}`}>
      <div className='product__image' style={{ backgroundImage: `url(${product.images && product.images.length > 0 ? `${process.env.serverUrl}${product.images[0].image}` : '/assets/default.png'})` }}></div>
    </Link>
    <Link href={`/shop/product/${product.id}`}><p className='product__name'>{product.name}</p></Link>
    <p className='product__description'>{product.description}</p>
    <p className='product__price'>${formatMoney(product.price)}</p>
  </div>)
}

export default ProductRow;