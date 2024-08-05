import React from "react";
import {
  Acl,
  IconAction,
  Space,
  TableVirtualized,
  Tag,
} from "../../components/ui";
import { faEye, faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "lodash";
import { Link } from "react-router-dom";
import { fullName } from "../../utils";
import { practicesStatus } from "../../data-list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dayjs from "dayjs";

export const PracticesTable = ({
  practices = [],
  users = [],
  onNavigateTo,
  onEditPractice,
  onConfirmRemovePractice,
}) => {
  const getPractitioner = (userId) => users.find((user) => user?.id === userId);

  const columns = [
    {
      title: "Fecha creación",
      dataIndex: "createAt",
      key: "createAt",
      width: ["40px", "10%"],
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
      width: ["60px", "20%"],
      render: (practice) => practice?.moduleNumber || "",
    },
    {
      title: "Nombre módulo",
      dataIndex: "name",
      key: "name",
      width: ["200px", "47%"],
      render: (practice) => capitalize(practice?.name) || "",
    },
    {
      title: "Practicante",
      dataIndex: "practitioner",
      key: "practitioner",
      width: ["60px", "20%"],
      render: (practice) => {
        const practitioner = getPractitioner(practice?.practitionerId);
        if (!practitioner) return;

        return (
          <Link to={`/users/${practitioner.id}`}>
            {practitioner ? fullName(practitioner) : ""}
          </Link>
        );
      },
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      width: ["60px", "20%"],
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
              {practicesStatus?.[practice.status]?.value}
            </Tag>
          </span>
        </Space>
      ),
    },
    {
      title: "Acciones",
      key: "actions",
      width: ["60px", "20%"],
      render: (practice) => (
        <Space>
          <Acl name="/practices/:practiceId/module1/sheets">
            <IconAction
              tooltipTitle="Pdf"
              icon={faFilePdf}
              styled={{ color: (theme) => theme.colors.error }}
              onClick={() => onNavigateTo(`${practice.id}/module1/sheets`)}
            />
          </Acl>
          <Acl name="/practices/:practiceId">
            <IconAction
              tooltipTitle="Ver practica"
              icon={faEye}
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
    <TableVirtualized
      dataSource={practices}
      columns={columns}
      rowHeaderHeight={50}
      rowBodyHeight={150}
    />
  );
};
