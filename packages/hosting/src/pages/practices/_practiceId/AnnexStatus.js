import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tag } from "antd";
import { practicesStatus } from "../../../data-list";

export const AnnexStatus = ({ annex }) => {
  const statusByCompanyRepresentative =
    practicesStatus?.[annex?.approvedByCompanyRepresentative];

  const statusByAcademicSupervisor =
    practicesStatus?.[annex?.approvedByAcademicSupervisor];

  return (
    <Container>
      {statusByCompanyRepresentative && (
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
            {statusByCompanyRepresentative?.name}
          </Tag>
          <span className="label">
            <span>Por</span> Representante de empresa
          </span>
        </div>
      )}
      {statusByAcademicSupervisor && (
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
            {statusByAcademicSupervisor?.name}
          </Tag>
          <span className="label">
            <span>Por</span> Supervisor academico
          </span>
        </div>
      )}
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
