import React from 'react';
import { Button } from 'antd';

const AppButton = ({
  children,
  className,
  type = 'primary'
}: {
  children: any;
  className?: string;
  type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed"
}) => {
  return <Button className={`app-button ${className ? className : ''}`} type={type}>{children}</Button>
}
export default AppButton;