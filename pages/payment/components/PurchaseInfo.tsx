import React from 'react';
import { Row, Col } from 'antd';
import Link from 'next/link';
import { formatMoney } from '../../../utils/common';

const PurchaseInfo = ({ subtotal, productsCount }: { subtotal: number, productsCount: number }) => {
  return (<div className='purchase_info'>
    <Row>
      <Col xs={8}>
        Subtotal:
      </Col>
      <Col xs={16}>
        <p>
          <span>${formatMoney(subtotal)}</span><br />
          <span>({productsCount} productos)</span><br />
          <Link href='/cart'><a>Ir carrito</a></Link>
        </p>
      </Col>
    </Row>
  </div>)
}

export default PurchaseInfo;