import React from "react";
import { DatePicker as AntdDatePicker } from "antd";
import { ComponentContainer } from "./component-container";
import moment from "moment";

export const DatePicker = ({
  value = undefined,
  name,
  required = false,
  disabled = false,
  hidden,
  error = false,
  helperText,
  dataTestId,
  label,
  variant = "filled",
  format = "DD/MM/YYYY",
  allowClear = true,
  onChange,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  value = value instanceof Date ? moment(value) : value;

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      hidden={hidden}
      error={error}
      label={label}
      helperText={helperText}
      dataTestId={dataTestId}
    >
      <AntdDatePicker
        size="large"
        format={format}
        value={value}
        disabled={disabled}
        name={name}
        placeholder=""
        onChange={onChange}
        allowClear={allowClear}
        variant="borderless"
        {...props}
      />
    </Container>
  );
};
