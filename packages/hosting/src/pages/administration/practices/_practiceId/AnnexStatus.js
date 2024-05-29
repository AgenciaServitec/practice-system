import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "antd";
import {
  faCheckCircle,
  faClock,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { isUndefined } from "lodash";

export const AnnexStatus = ({ annex }) => {
  const annexStatusByRole = {
    true: {
      value: "Aprobado",
      type: "success",
      icon: faCheckCircle,
    },
    false: {
      value: "Rechazado",
      type: "error",
      icon: faXmarkCircle,
    },
    undefined: {
      value: "Pendiente",
      type: "warning",
      icon: faClock,
    },
  };

  const statusByCompanyRepresentative =
    annexStatusByRole?.[
      (isUndefined(annex?.approvedByCompanyRepresentative)
        ? "undefined"
        : annex.approvedByCompanyRepresentative
      ).toString()
    ];
  const statusByAcademicSupervisor =
    annexStatusByRole?.[
      (isUndefined(annex?.approvedByAcademicSupervisor)
        ? "undefined"
        : annex.approvedByAcademicSupervisor
      ).toString()
    ];

  return (
    <Container>
      <div className="item">
        <Tag
          icon={
            <FontAwesomeIcon
              size="sm"
              icon={statusByCompanyRepresentative?.icon}
            />
          }
          color={statusByCompanyRepresentative?.type}
        >
          {" "}
          {statusByCompanyRepresentative?.value}
        </Tag>
        <span className="label">
          <span>Por</span> Representante de empresa:
        </span>
      </div>
      <div className="item">
        <Tag
          icon={
            <FontAwesomeIcon
              size="sm"
              icon={statusByAcademicSupervisor?.icon}
            />
          }
          color={statusByAcademicSupervisor?.type}
        >
          {" "}
          {statusByAcademicSupervisor?.value}
        </Tag>
        <span className="label">
          <span>Por</span> Supervisor academico:
        </span>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 1em;
  .item {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    .label {
      text-align: left;
      font-size: 0.65em;
      width: 10em;
      line-height: 1em;
      margin-bottom: 0.5em;
      gap: 0.2em;
      font-weight: 600;
      span {
        font-weight: 400;
      }
    }
  }
`;
