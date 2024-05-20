import React from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import Typography from "antd/lib/typography";
import {
  Acl,
  AddButton,
  modalConfirm,
  notification,
} from "../../../components";
import { Divider } from "antd";
import Tabs from "antd/lib/tabs";
import { useAuthentication, useGlobalData } from "../../../providers";
import { useNavigate } from "react-router";
import { UsersTable } from "./UserTable";
import { CompaniesTable } from "./CompaniesTable";
import { useApiUserPatch } from "../../../api";
import { assign } from "lodash";
import { useQueryString } from "../../../hooks";

const { Title } = Typography;

export const Users = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { users } = useGlobalData();
  const { patchUser, patchUserResponse } = useApiUserPatch();
  const [usersType, setUsersType] = useQueryString("usersType", "persons");

  const _users = users.filter((user) => user.type === "person");
  const _companies = users.filter((user) => user.type === "company");

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
      title: "User deleted successfully!",
    });
  };

  const onConfirmRemoveUser = (user) =>
    modalConfirm({
      content: "El usuario se eliminará",
      onOk: async () => {
        await onDeleteUser(user);
      },
    });

  const onChange = (key) => {
    console.log(key);
    setUsersType(key);
  };

  const items = [
    {
      key: "persons",
      label: "Personas",
      children: (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <UsersTable
              users={_users}
              onEditUser={onEditUser}
              onConfirmRemoveUser={onConfirmRemoveUser}
            />
          </Col>
        </Row>
      ),
    },
    {
      key: "companies",
      label: "Empresas",
      children: (
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <CompaniesTable
              companies={_companies}
              onEditUser={onEditUser}
              onConfirmRemoveUser={onConfirmRemoveUser}
            />
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Acl redirect name="/users">
      <Row gutter={[16, 16]}>
        <Acl name="/users/new">
          <>
            <Col span={24}>
              <AddButton onClick={onAddUser} title="Usuario" margin="0" />
            </Col>
            <Divider />
          </>
        </Acl>
        <Col span={24}>
          <Title level={3}>Usuarios</Title>
        </Col>
        <Col span={24}>
          <Tabs
            defaultActiveKey={usersType}
            items={items}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Acl>
  );
};
