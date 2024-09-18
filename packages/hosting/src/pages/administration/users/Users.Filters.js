import React from "react";
import styled from "styled-components";
import { Select } from "../../../components";
import { concat } from "lodash";
import { Roles } from "../../../data-list";

export const UsersFilters = ({ user, filterFields, onFilter }) => {
  const onChangeRoleCode = (value) =>
    onFilter({
      ...filterFields,
      roleCode: value === "all" ? "all" : value,
    });

  return (
    <Container>
      <FormContent>
        {["super_admin", "admin"].includes(user.roleCode) && (
          <Select
            label="Rol"
            value={filterFields.roleCode}
            onChange={(value) => onChangeRoleCode(value)}
            options={concat(
              [{ label: "Todos", value: "all" }],
              Roles.map((role) => ({
                label: role.name,
                value: role.code,
              })).filter((role) => role.name !== "all")
            )}
          />
        )}
      </FormContent>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const FormContent = styled.div`
  display: grid;
  align-items: center;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
`;
