import React from 'react';
import { Button } from 'antd';

const AppButton = ({
  children,
  className,
  type = 'primary',
  htmlType = 'button',
  loading = false,
}: {
  children: any;
  className?: string;
  type?: "link" | "text" | "ghost" | "default" | "primary" | "dashed"
  htmlType?: "button" | "submit" | "reset";
  loading?: boolean;
}) => {
  return <Button className={`app-button ${className ? className : ''}`} loading={loading} htmlType={htmlType} type={type}>{children}</Button>
}
export default AppButton;