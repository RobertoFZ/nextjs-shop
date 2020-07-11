import React from 'react';

const Container = ({ children, style = {} }: { children: any, style?: object }) => (<div className='container' style={style}>
  {children}
</div>);

export default Container;