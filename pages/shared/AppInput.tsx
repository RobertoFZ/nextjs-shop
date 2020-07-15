import React from 'react';
import { Rule } from "antd/lib/form";
import { Form, Input, Checkbox, InputNumber, DatePicker } from 'antd';
import Link from 'next/link';

const { TextArea } = Input;

export type AppInputProps = {
  name: string;
  className?: string;
  placeholder?: string;
  label?: string;
  checkboxText?: string;
  type?: 'text' | 'password' | 'checkbox' | 'textarea' | 'money' | 'datepicker' | 'number' | 'tel' | 'email';
  rules?: Rule[];
  onChange?: Function;
  valuePropName?: string;
  checkboxLink?: string;
  checkboxLinkText?: string;
  component?: any;
}

const AppInput = (props: AppInputProps) => {
  const {
    name,
    className = '',
    label,
    checkboxText = '',
    placeholder = '',
    rules = [],
    type = 'text',
    onChange = () => true,
    valuePropName = 'value',
    checkboxLink,
    checkboxLinkText,
    component
  } = props;

  function getInputType() {
    switch (type) {
      case 'password':
        return <Input.Password onChange={(event: any) => onChange(event.target.value)} placeholder={placeholder} />
      case 'checkbox':
        return <Checkbox onChange={(event: any) => onChange(event.target.checked)}>{checkboxText}{checkboxLink ? <a href={checkboxLink} target='_blank'>{checkboxLinkText}</a> : ''}</Checkbox>
      case 'textarea':
        return <TextArea rows={3} onChange={(event: any) => onChange(event.target.value)} placeholder={placeholder} />
      case 'money':
        return <InputNumber
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
          placeholder={placeholder}
          onChange={(event: any) => onChange(event.target.value)}
        />
      case 'datepicker':
        return <DatePicker onChange={(value: any) => onChange(value)} placeholder={placeholder} style={{ width: '100%' }} />
      default:
        return <Input type={type} onChange={(event: any) => onChange(event.target.value)} placeholder={placeholder} />
    }
  }

  return (<Form.Item
    className={`endor-input ${className}`}
    label={label}
    labelAlign='left'
    name={name}
    rules={rules}
    valuePropName={type === 'checkbox' ? 'checked' : valuePropName}
  >
    {component || getInputType()}
  </Form.Item>);
}

export default AppInput;