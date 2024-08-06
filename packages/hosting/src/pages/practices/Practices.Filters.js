import React from "react";
import styled from "styled-components";
import { Select } from "../../components";
import { concat, uniq } from "lodash";
import { fullName } from "../../utils";
import { practicesStatus } from "../../data-list";

export const PracticesFilters = ({
  practices = [],
  users = [],
  filterFields,
  onFilter,
}) => {
  const usersIds = uniq(practices.map((practice) => practice?.user));
  const _users = uniq(
    users.filter((user) => usersIds.find((userId) => userId === user.id))
  );

  const onChangeUser = (value) =>
    onFilter({
      ...filterFields,
      user: !value ? "all" : value,
    });

  const onChangeStatus = (value) =>
    onFilter({
      ...filterFields,
      status: !value ? "all" : value,
    });

  return (
    <Container>
      <FormContent>
        <Select
          label="Usuario"
          value={filterFields.user}
          onChange={(value) => onChangeUser(value)}
          options={concat(
            [{ label: "Todos", value: "all" }],
            _users.map((user) => ({ label: fullName(user), value: user.id }))
          )}
        />
        <Select
          label="Estado"
          value={filterFields.status}
          onChange={(value) => onChangeStatus(value)}
          options={concat(
            [{ label: "Todos", value: "all" }],
            Object.entries(practicesStatus).map(([key, values]) => ({
              label: values.value,
              value: key,
            }))
          )}
        />
      </FormContent>
    </Container>
  );
};

const Container = styled.div``;

const FormContent = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
`;
