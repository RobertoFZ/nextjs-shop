import React from 'react';
import { Spin } from 'antd';

const Loader = ({ loading, size }: { loading: boolean, size?: 'small' | 'large' }) => {
  return loading ? <div style={{ width: '100%', textAlign: 'center', margin: '2rem 0' }}>
    <Spin size={size} />
  </div> : null;
}

export default Loader