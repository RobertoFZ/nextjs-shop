import React from 'react';
import { Row, Col, Button } from 'antd';
import { Cart, formatMoney } from '../../../utils/common';

const DeliveryMethod = ({
  packageItem,
  number,
  cost,
  onClick = () => { },
}: {
  packageItem: Cart[],
  number: number,
  cost: number,
  onClick?: Function,
}) => {
  return (<div className='delivery_method'>
    <Row>
      <Col xs={8}>
        Envío <br />paquete {number}
      </Col>
      <Col xs={16}>
        <p>
          {
            cost === 0 ? <span>GRATIS</span> : <span>${formatMoney(cost)}</span>
          }
        </p>
        <Button type='link' onClick={() => onClick(packageItem)} style={{ padding: 0 }}>Ver paquete</Button>
      </Col>
    </Row>
  </div>)
}

export default DeliveryMethod;