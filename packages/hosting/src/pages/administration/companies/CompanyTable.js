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
      dataIndex: "socialReason",
      key: "socialReason",
      render: (_, company) => company?.socialReason || "",
    },

    {
      title: "Región",
      dataIndex: "region",
      key: "region",
      render: (_, company) => company?.region || "",
    },
    {
      title: "Provincia",
      dataIndex: "province",
      key: "province",
      render: (_, company) => company?.province || "",
    },
    {
      title: "Distrito",
      dataIndex: "district",
      key: "district",
      render: (_, company) => company?.district || "",
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      render: (_, company) => company?.address || "",
    },
    {
      title: "Rubro",
      dataIndex: "category",
      key: "category",
      render: (_, company) => company?.category || "",
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
      title: "Sitio Web",
      dataIndex: "webSite",
      key: "webSite",
      render: (_, company) => company?.webSite || "",
    },
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      render: (_, company) => company?.email || "",
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
