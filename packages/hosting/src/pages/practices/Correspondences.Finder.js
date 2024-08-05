import React, { memo } from "react";
import styled from "styled-components";
import { DatePicker, Input } from "../../components";
import { mediaQuery } from "../../styles";
import dayjs from "dayjs";

const CorrespondencesFinder = ({ searchFields, onSearch }) => {
  const onChangeTourDate = (value) =>
    onSearch({
      ...searchFields,
      createAt: dayjsToDateString(value),
    });

  const onChangeSearchTerm = (event) =>
    onSearch({
      ...searchFields,
      searchTerm: event.target.value,
    });

  return (
    <Container>
      <FormContent>
        <DatePicker
          label="Fecha de correspondencia"
          value={dateStringToDayjs(searchFields.createAt)}
          onChange={onChangeTourDate}
          allowClear
        />
        <Input
          label=""
          placeholder="Buscar por"
          value={searchFields.searchTerm}
          onChange={onChangeSearchTerm}
        />
      </FormContent>
    </Container>
  );
};

export default memo(CorrespondencesFinder);

const dateStringToDayjs = (dateString) =>
  dayjs(dateString, "YYYY-MM-DD", true).isValid()
    ? dayjs(dateString, "YYYY-MM-DD")
    : undefined;

const dayjsToDateString = (date) => date?.format("YYYY-MM-DD") || undefined;

const Container = styled.section``;

const FormContent = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 1rem;
  grid-template-columns: 1fr;

  ${mediaQuery.minDesktop} {
    grid-template-columns: 160px 1fr;
  }
`;
