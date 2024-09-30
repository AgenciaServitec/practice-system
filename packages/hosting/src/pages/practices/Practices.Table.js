import React, { useState } from "react";
import {
  Acl,
  IconAction,
  Space,
  TableVirtualized,
  Tag,
} from "../../components/ui";
import {
  faEdit,
  faFilePdf,
  faHistory,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "lodash";
import { Link } from "react-router-dom";
import { fullName } from "../../utils";
import { practicesStatus } from "../../data-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

export const PracticesTable = ({
  practices = [],
  user = null,
  users = [],
  onNavigateTo,
  onEditPractice,
  onConfirmRemovePractice,
  onOpenPracticeModal,
}) => {
  const [practice, setPractice] = useState({});

  const getPractitioner = (userId) => users.find((user) => user?.id === userId);

  const isAdministratorUser = [
    "super_admin",
    "company_representative",
    "academic_supervisor",
    "academic_coordinator",
  ].includes(user.roleCode);

  const columns = [
    {
      title: "Fecha creación",
      dataIndex: "createAt",
      key: "createAt",
      width: ["7rem", "100%"],
      render: (practice) =>
        practice?.createAt
          ? dayjs(practice.createAt.toDate()).format("DD/MM/YYYY HH:mm")
          : null,
    },
    {
      title: "N° Módulo",
      dataIndex: "moduleNumber",
      align: "center",
      key: "moduleNumber",
      width: ["5rem", "100%"],
      render: (practice) => practice?.moduleNumber || "",
    },
    {
      title: "Nombre módulo",
      dataIndex: "name",
      key: "name",
      width: ["15rem", "100%"],
      render: (practice) => capitalize(practice?.name) || "",
    },
    {
      title: "Practicante",
      dataIndex: "practitioner",
      key: "practitioner",
      width: ["11rem", "100%"],
      render: (practice) => {
        const practitioner = getPractitioner(practice?.practitionerId);
        if (!practitioner) return;

        return isAdministratorUser ? (
          <Link to={`/users/${practitioner.id}`}>
            {practitioner ? fullName(practitioner) : ""}
          </Link>
        ) : (
          <span>{practitioner ? fullName(practitioner) : ""}</span>
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: ["7rem", "100%"],
      render: (practice) => (
        <Space>
          <span>
            <Tag
              color={practicesStatus?.[practice.status]?.type}
              icon={
                <FontAwesomeIcon
                  size="sm"
                  icon={practicesStatus?.[practice.status]?.icon}
                />
              }
            >
              {" "}
              {practicesStatus?.[practice.status]?.name}
            </Tag>
          </span>
        </Space>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      width: ["10rem", "100%"],
      render: (practice) => (
        <Space>
          <Acl name="/practices/:practiceId/:module/sheets">
            <IconAction
              tooltipTitle="Pdf"
              icon={faFilePdf}
              styled={{ color: (theme) => theme.colors.error }}
              onClick={() =>
                onNavigateTo(
                  `${practice.id}/module${practice.moduleNumber}/sheets`
                )
              }
            />
          </Acl>
          <IconAction
            tooltipTitle="Proceso de la Práctica"
            icon={faHistory}
            onClick={() => onOpenPracticeModal(practice.id)}
          />
          <Acl name="/practices/:practiceId">
            <IconAction
              tooltipTitle="Revisar práctica"
              icon={faEdit}
              onClick={() => onEditPractice(practice.id)}
            />
          </Acl>
          {practice?.status !== "approved" && (
            <Acl name="/practices#delete">
              <IconAction
                tooltipTitle="Eliminar"
                styled={{ color: (theme) => theme.colors.error }}
                icon={faTrash}
                onClick={() => onConfirmRemovePractice(practice)}
              />
            </Acl>
          )}
        </Space>
      ),
    },
  ];

  return (
    <TableVirtualized
      dataSource={practices}
      columns={columns}
      rowHeaderHeight={50}
      rowBodyHeight={150}
    />
  );
};
