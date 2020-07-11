import React from 'react';

type Props = {
  vertical?: boolean,
  containerClassName?: string,
  lineClassName?: string,
}

const Line = ({ vertical = true, containerClassName = '', lineClassName = '' }: Props) => {
  return (
    vertical ? <div className={`line ${containerClassName}`}><span className={`line__white ${lineClassName}`}></span></div> : <hr className={`line-horizontal ${lineClassName}`}></hr>
  );
}

export default Line;
