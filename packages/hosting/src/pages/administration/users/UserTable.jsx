import React from "react";
import { Space, Table, Tag } from "antd";
import { Acl, IconAction } from "../../../components";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "lodash";
import { Roles } from "../../../data-list";
import { useAuthentication } from "../../../providers";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export const UsersTable = ({ users, onEditUser, onConfirmRemoveUser }) => {
  const { authUser } = useAuthentication();

  const findRole = (roleCode) => Roles.find((role) => role.code === roleCode);

  const getUsersByRoleCode = (roleCode) => {
    switch (roleCode) {
      case "super_admin":
        return users;
      case "admin":
        return users;
      case "academic_supervisor":
        return users.filter(
          (user) =>
            user.roleCode === "user" &&
            user?.academicSupervisorId === authUser.id
        );
      case "academic_coordinator":
        return users.filter(
          (user) =>
            user.roleCode === "user" &&
            user?.academicCoordinatorId === authUser.id
        );
      case "company_representative":
        return users.filter(
          (user) =>
            user.roleCode === "user" &&
            (user?.companiesIds || []).includes(
              authUser?.companyRepresentativeData?.companyId
            )
        );
    }
  };

  const usersView = getUsersByRoleCode(authUser.roleCode);

  const columns = [
    {
      title: "Fecha creación",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, user) =>
        dayjs(user?.createAt.toDate()).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Nombres y Apellidos",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, user) =>
        capitalize(
          `${user?.firstName} ${user?.paternalSurname} ${
            user?.maternalSurname || "No definido"
          }`
        ),
    },
    {
      title: "Rol",
      dataIndex: "roleCode",
      key: "roleCode",
      render: (_, user) => findRole(user?.roleCode)?.name || "",
    },
    {
      title: "DNI",
      dataIndex: "dni",
      key: "dni",
      render: (_, user) => user?.dni || "",
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
      title: "Practicas",
      dataIndex: "practices",
      key: "practices",
      render: (_, user) => (
        <Space>
          {user?.hasPractices && (
            <span>
              <Link to={`/practices?user=${user.id}`}>Ver practicas</Link>
            </span>
          )}
        </Space>
      ),
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
      dataSource={usersView}
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};
``;
