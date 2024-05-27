import React from "react";
import { Space, Table, Tag } from "antd";
import { Acl, IconAction } from "../../../components";
import { faEdit, faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import { capitalize } from "lodash";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../../providers";

export const PracticeTable = ({
  practices,
  onEditPractice,
  onConfirmRemovePractice,
}) => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();

  const onNavigateTo = (pathName) => navigate(pathName);

  const getPracticesByRoleCode = (roleCode) => {
    switch (roleCode) {
      case "super_admin":
        return practices;
      case "admin":
        return practices;
      case "academic_supervisor":
        return practices.filter(
          (practice) => practice.academicSupervisorId === authUser.id
        );
      case "academic_coordinator":
        return practices.filter(
          (practice) => practice.academicCoordinatorId === authUser.id
        );
      case "company_representative":
        return practices.filter(
          (practice) => practice.companyRepresentativeId === authUser.id
        );
      case "user":
        return practices.filter(
          (practice) => practice.practitionerId === authUser.id
        );
    }
  };

  const practicesView = getPracticesByRoleCode(authUser.roleCode);

  const columns = [
    {
      title: "Fecha creación",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, practice) =>
        moment(practice?.createAt.toDate()).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "N° de Módulo",
      dataIndex: "moduleNumber",
      align: "center",
      key: "moduleNumber",
      render: (_, practice) => practice?.moduleNumber || "",
    },
    {
      title: "Nombre del Módulo",
      dataIndex: "name",
      key: "name",
      render: (_, practice) => capitalize(practice?.name) || "",
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (_, practice) => (
        <Space>
          <span>
            <Tag color="yellow">{practice?.status}</Tag>
          </span>
        </Space>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      render: (_, practice) => (
        <Space>
          <Acl name="/practices/:practiceId/module1/sheets">
            <IconAction
              tooltipTitle="Pdf"
              icon={faFilePdf}
              styled={{ color: (theme) => theme.colors.error }}
              onClick={() =>
                onNavigateTo(`/practices/${practice.id}/module1/sheets`)
              }
            />
          </Acl>
          <Acl name="/practices/:practiceId">
            <IconAction
              tooltipTitle="Editar"
              icon={faEdit}
              onClick={() => onEditPractice(practice.id)}
            />
          </Acl>
          <Acl name="/practices#delete">
            <IconAction
              tooltipTitle="Eliminar"
              styled={{ color: (theme) => theme.colors.error }}
              icon={faTrash}
              onClick={() => onConfirmRemovePractice(practice)}
            />
          </Acl>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={practicesView}
      pagination={false}
      scroll={{ x: "max-content" }}
    />
  );
};
