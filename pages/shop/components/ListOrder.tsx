import React from 'react';
import { Row, Col, Select } from 'antd';

const Option = Select.Option;

const ListOrder = ({
  onChange = () => true,
  value = 'none',
}: {
  onChange?: Function;
  value?: string;
}) => {
  return (<Row className='list-order'>
    <Col xs={24} md={16}>

    </Col>
    <Col xs={24} md={8}>
      <Select className='list-order__select' allowClear={true} value={value} onChange={(value: string) => onChange(value)}>
        <Option value='none' disabled>Ordenar por</Option>
        <Option value='asc'>Precio: menor a mayor</Option>
        <Option value='desc'>Precio: mayor a menor</Option>
      </Select>
    </Col>
  </Row>);
}

export default ListOrder;