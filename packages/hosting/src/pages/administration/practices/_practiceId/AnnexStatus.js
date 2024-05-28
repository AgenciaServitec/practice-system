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
        <span className="label">Representante de empresa:</span>
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
      </div>
      <div className="item">
        <span className="label">Supervisor academico:</span>
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
    justify-content: end;
    .label {
      font-size: 0.8em;
      width: 7em;
      line-height: 1em;
      margin-bottom: 0.5em;
    }
  }
`;
