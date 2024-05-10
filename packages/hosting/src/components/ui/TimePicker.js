import React from "react";
import TimePickerAntd from "antd/lib/time-picker";
import { ComponentContainer } from "./component-container";
import moment from "moment/moment";

export const TimePicker = ({
  value = undefined,
  disabled = false,
  required = false,
  error = false,
  label,
  variant = "filled",
  helperText,
  animation,
  ...props
}) => {
  const Container = ComponentContainer[variant];

  value = value instanceof Date ? moment(value) : value;

  return (
    <Container
      value={value}
      required={required}
      disabled={disabled}
      error={error}
      label={label}
      animation={animation}
      helperText={helperText}
    >
      <TimePickerAntd
        disabled={disabled}
        format="HH:mm"
        variant="borderless"
        size="large"
        placeholder=""
        value={value}
        {...props}
      />
    </Container>
  );
};
