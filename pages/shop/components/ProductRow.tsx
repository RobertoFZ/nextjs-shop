import React from 'react';
import { Product } from '../../../api/Product/Product';
import { formatMoney } from '../../../utils/common';
import Link from 'next/link';

const ProductRow = ({
  product
}: {
  product: Product;
}) => {
  if (!product) return null;
  return (<div className='product-row'>
    <Link href={`/shop/product/${product.id}`}>
      <div className='product-row__image' style={{ backgroundImage: `url(${product.images && product.images.length > 0 ? `${process.env.serverUrl}${product.images[0].image}` : '/assets/default.png'})` }}></div>
    </Link>
    <Link href={`/shop/product/${product.id}`}><p className='product-row__name'>{product.name}</p></Link>
    <p className='product-row__description'>{product.description}</p>
    <p className='product-row__price'>${formatMoney(product.price)}</p>
  </div>)
}

export default ProductRow;