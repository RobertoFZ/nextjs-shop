import React from 'react';
import { Row, Col, Select } from 'antd';

const Option = Select.Option;

const ListOrder = () => {
  return (<Row className='list-order'>
    <Col xs={24} md={16}>

    </Col>
    <Col xs={24} md={8}>
      <Select className='list-order__select' value=''>
        <Option value={''}>Últimos agregados</Option>
        <Option value={'asc'}>Precio: Mayor a menor</Option>
        <Option value={'desc'}>Precio: menor a mayor</Option>
      </Select>
    </Col>
  </Row>);
}

export default ListOrder;