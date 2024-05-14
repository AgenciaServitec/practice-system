import React from "react";
import { Space, Table, Tag } from "antd";
import { Acl, IconAction } from "../../../components";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CompanyStatus } from "../../../data-list";

export const CompanyTable = ({
  onEditCompany,
  onConfirmRemoveCompany,
  companies,
}) => {
  const columns = [
    {
      title: "RUC",
      dataIndex: "ruc",
      key: "ruc",
      render: (_, company) => company?.ruc || "",
    },
    {
      title: "Razón Social",
      dataIndex: "name",
      key: "name",
      render: (_, company) => company?.name || "",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      render: (_, company) => company?.email || "",
    },
    {
      title: "Teléfono",
      dataIndex: "phone",
      key: "phone",
      render: (_, company) => company?.phone || "",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (_, company) => {
        const status = CompanyStatus?.[company?.status];

        return (
          <Space>
            <span>
              <Tag color={status?.color}>{status?.value || ""}</Tag>
            </span>
          </Space>
        );
      },
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, company) => (
        <Space>
          <Acl name="/companies/:companyId">
            <IconAction
              tooltipTitle="Editar"
              icon={faEdit}
              onClick={() => onEditCompany(company.id)}
            />
          </Acl>
          <Acl name="/companies#delete">
            <IconAction
              tooltipTitle="Eliminar"
              styled={{ color: (theme) => theme.colors.error }}
              icon={faTrash}
              onClick={() => onConfirmRemoveCompany(company)}
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
