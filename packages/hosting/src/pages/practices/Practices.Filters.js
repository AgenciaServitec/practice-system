import React from "react";
import styled from "styled-components";
import { Select } from "../../components";
import { concat, uniq } from "lodash";
import { fullName } from "../../utils";

export const PracticesFilters = ({
  practices = [],
  users = [],
  filter,
  onFilter,
}) => {
  const usersIds = uniq(practices.map((practice) => practice?.user));
  const _users = uniq(
    users.filter((user) => usersIds.find((userId) => userId === user.id))
  );

  const onChangeUser = (value) =>
    onFilter({
      ...filter,
      user: !value ? "all" : value,
    });

  return (
    <Container>
      <FormContent>
        <Select
          label="Usuario"
          value={filter.user}
          onChange={(value) => onChangeUser(value)}
          options={concat(
            [{ label: "Todos", value: "all" }],
            _users.map((user) => ({ label: fullName(user), value: user.id }))
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
