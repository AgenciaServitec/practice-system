import React from "react";
import styled from "styled-components";
import CalendarAntd from "antd/lib/calendar";
import dayjs from "dayjs";

export const Calendar = ({ defaultValue, fullscreen = false, ...props }) => (
  <CalendarStyled
    fullscreen={fullscreen}
    defaultValue={defaultValue || dayjs()}
    {...props}
  />
);

const CalendarStyled = styled(CalendarAntd)`
  .ant-picker-calendar-header {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
