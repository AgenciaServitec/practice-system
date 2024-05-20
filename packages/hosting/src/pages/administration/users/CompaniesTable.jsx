import React from "react";
import { Space, Table, Tag } from "antd";
import { Acl, IconAction, Text } from "../../../components";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "lodash";
import moment from "moment";
import { Roles } from "../../../data-list";

export const CompaniesTable = ({
  companies,
  onEditUser,
  onConfirmRemoveUser,
}) => {
  const findRole = (roleCode) => Roles.find((role) => role.code === roleCode);

  const columns = [
    {
      title: "Razón Social",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, user) => (
        <div style={{ width: "17em" }}>
          <Text ellipsis={1}>{capitalize(user?.socialReason)}</Text>
        </div>
      ),
    },
    {
      title: "Rol",
      dataIndex: "roleCode",
      key: "roleCode",
      render: (_, user) => findRole(user?.roleCode)?.name || "",
    },
    {
      title: "RUC",
      dataIndex: "ruc",
      key: "ruc",
      render: (_, user) => user?.ruc || "",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, user) => user?.email || "",
    },
    {
      title: "Teléfono",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, user) =>
        user?.phone ? `${user.phone.prefix} ${user.phone.number}` : "",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (_, user) => (
        <Space>
          <span>
            <Tag color="yellow">{user?.status}</Tag>
          </span>
        </Space>
      ),
    },
    {
      title: "Fecha creación",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, user) =>
        moment(user?.createAt.toDate()).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, user) => (
        <Space>
          <Acl name="/users/:userId">
            <IconAction
              tooltipTitle="Editar"
              icon={faEdit}
              onClick={() => onEditUser(user)}
            />
          </Acl>
          <Acl name="/users#delete">
            <IconAction
              tooltipTitle="Eliminar"
              styled={{ color: (theme) => theme.colors.error }}
              icon={faTrash}
              onClick={() => onConfirmRemoveUser(user)}
            />
          </Acl>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={companies}
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};
``;
