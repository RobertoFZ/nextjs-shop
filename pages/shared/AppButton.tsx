import React from 'react';
import { Button } from 'antd';

const AppButton = ({
  children,
  className,
  type = 'primary',
  htmlType = 'button'
}: {
  children: any;
  className?: string;
  type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed"
  htmlType?: "button" | "submit" | "reset";
}) => {
  return <Button className={`app-button ${className ? className : ''}`} htmlType={htmlType} type={type}>{children}</Button>
}
export default AppButton;