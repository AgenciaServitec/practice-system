import React from "react";
import { Space, Table, Tag } from "antd";
import { Acl, IconAction } from "../../../components";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { CompanyStatus } from "../../../data-list";
import { useAuthentication } from "../../../providers";

export const CompanyTable = ({
  onEditCompany,
  onConfirmRemoveCompany,
  companies,
}) => {
  const { authUser } = useAuthentication();

  const getCompaniesByRoleCode = (roleCode) => {
    switch (roleCode) {
      case "super_admin":
        return companies;
      case "admin":
        return companies;
      case "academic_supervisor":
        return companies;
      case "academic_coordinator":
        return companies;
      case "company_representative":
        return companies.filter(
          (company) => company.representativeId === authUser.id
        );
    }
  };

  const companiesView = getCompaniesByRoleCode(authUser.roleCode);

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
      title: "Email",
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
      dataSource={companiesView}
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};
