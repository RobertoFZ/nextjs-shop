import React from 'react';
import { LineOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { Cart, formatMoney } from '../../../utils/common';

type Props = {
  cart: Cart[];
  onRemove: Function;
}
const ProductsTable = ({ cart = [], onRemove = () => { } }: Props) => {
  return (<div className='products_table__container'>
    <table className='products_table'>
      <thead>
        <tr>
          <th></th>
          <th className='text-left'>Producto</th>
          <th className='text-center'>Precio</th>
          <th className='text-center'>Cantidad</th>
          <th className='text-center'>Total</th>
          <th className='text-center'></th>
        </tr>
      </thead>
      <tbody>
        {
          cart.length === 0 && <tr>
            <td colSpan={5} className='text-center'>
              No tienes productos en tu carrito. <br />
              <Link href='/shop'><a>¡Comezar a compar!</a></Link>
            </td>
          </tr>
        }
        {
          cart.map((cart: Cart) => <tr key={cart.variant.id}>
            <td style={{ width: '180px' }}>
              <Link href={`/product/${cart.product.id}`}>
                <div className='products_table__image' style={{
                  backgroundImage: `url("${cart.product.images.length > 0 ? `${process.env.serverUrl}${cart.product.images[0].image}` : '/logo.png'}")`
                }}>

                </div>
              </Link>
            </td>
            <td>
              {cart.product.business.name} <br />
              <Link href={`/product/${cart.product.id}`}><a>{cart.product.name} ({cart.variant.name})</a></Link>
            </td>
            <td className='text-center'>${formatMoney(cart.variant.price || cart.product.price)}</td>
            <td className='text-center'>{cart.quantity}</td>
            <td className='text-center'>${formatMoney((cart.variant.price || cart.product.price) * cart.quantity)}</td>
            <td><LineOutlined className='products_table__remove' onClick={() => onRemove(cart.variant, cart.product)} /></td>
          </tr>)
        }
      </tbody>
    </table>
  </div>)
}

export default ProductsTable;