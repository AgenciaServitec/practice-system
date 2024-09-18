import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import { Acl, modalConfirm, notification } from "../../../components";
import { useAuthentication, useGlobalData } from "../../../providers";
import { useNavigate } from "react-router";
import { useApiUserPatch } from "../../../api";
import { assign } from "lodash";
import { useQueriesState } from "../../../hooks";
import { UsersTable } from "./Users.Table";
import { UsersFilters } from "./Users.Filters";

const { Title } = Typography;

export const Users = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { users } = useGlobalData();
  const { patchUser, patchUserResponse } = useApiUserPatch();
  const [filterFields, setFilterFields] = useQueriesState({
    roleCode: "all",
  });

  const navigateTo = (userId) => {
    const url = `/users/${userId}`;
    navigate(url);
  };

  const onAddUser = () => navigateTo("new");

  const onEditUser = (user) => navigateTo(user.id);

  const onDeleteUser = async (user) => {
    const user_ = assign({}, user, { updateBy: authUser?.email });

    await patchUser(user_);

    if (!patchUserResponse.ok)
      return notification({
        type: "error",
      });

    notification({
      type: "success",
      title: "¡Usuario eliminado exitosamente!",
    });
  };

  const onConfirmRemoveUser = (user) =>
    modalConfirm({
      content: "El usuario se eliminará",
      onOk: async () => {
        await onDeleteUser(user);
      },
    });

  const usersView = mapUsersView(users).filter(filterFields).users;

  return (
    <Acl name="/users" redirect>
      <Row gutter={[16, 16]}>
        {/*<Acl name="/users/new">*/}
        {/*  <>*/}
        {/*    <Col span={24}>*/}
        {/*      <AddButton*/}
        {/*        onClick={onAddUser}*/}
        {/*        title={*/}
        {/*          authUser.roleCode === "company_representative"*/}
        {/*            ? "Practicante"*/}
        {/*            : "Usuario"*/}
        {/*        }*/}
        {/*        margin="0"*/}
        {/*      />*/}
        {/*    </Col>*/}
        {/*    <Divider />*/}
        {/*  </>*/}
        {/*</Acl>*/}
        <Col span={24}>
          <Title level={3}>
            {["super_admin", "admin"].includes(authUser.roleCode)
              ? "Usuarios"
              : "Practicantes"}
          </Title>
        </Col>
        <Col span={24}>
          <UsersFilters
            user={authUser}
            filterFields={filterFields}
            onFilter={setFilterFields}
          />
        </Col>
        <Col span={24}>
          <UsersTable
            users={usersView}
            onEditUser={onEditUser}
            onConfirmRemoveUser={onConfirmRemoveUser}
          />
        </Col>
      </Row>
    </Acl>
  );
};

const mapUsersView = (users) => {
  const mapView = {
    users: users,
    filter(filterFields) {
      mapView.users = filteredUsers(mapView.users, filterFields);
      return mapView;
    },
  };

  return mapView;
};

const filteredUsers = (users, filterFields) =>
  users.filter((user) =>
    filterFields.roleCode === "all"
      ? true
      : filterFields.roleCode === user.roleCode
  );
