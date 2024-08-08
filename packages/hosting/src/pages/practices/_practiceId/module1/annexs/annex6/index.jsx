import React, { useEffect } from "react";
import {
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";
import styled from "styled-components";
import { Sheet2Integration } from "./Sheet2";
import { Sheet3Integration } from "./Sheet3";
import { updateAnnex } from "../../../../../../firebase/collections/annexs";
import { isUndefined } from "lodash";
import { AnnexButtons } from "../AnnexButtons";

export const Annex6Integration = ({
  practice,
  user,
  users,
  practitioner,
  representativeCompany,
  company,
  annex6,
  onSavePractice,
  supervisor,
}) => {
  useEffect(() => {
    (async () => {
      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex6;

      await updateAnnex(practice.id, "annex6", {
        status:
          approvedByCompanyRepresentative && approvedByAcademicSupervisor
            ? "approved"
            : isUndefined(approvedByCompanyRepresentative) ||
              isUndefined(approvedByAcademicSupervisor)
            ? "pending"
            : "refused",
      });
    })();
  }, [annex6]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const onApprovedAnnex4 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas aprovar el anexo 6?",
      content: "El anexo 6 pasara al estado de aprobado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para aprobar!",
          });
        }

        await updateAnnex(practice.id, "annex6", {
          ...(user.roleCode === "company_representative" && {
            approvedByCompanyRepresentative: true,
          }),
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: true,
          }),
        });

        notification({ type: "success" });
      },
    });

  const onRefusedAnnex6 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas rechazar el anexo 6?",
      content: "El anexo 6 pasara al estado de rechazado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para rechazar!",
          });
        }

        await updateAnnex(practice.id, "annex6", {
          ...(user.roleCode === "company_representative" && {
            approvedByCompanyRepresentative: false,
          }),
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: false,
          }),
        });

        notification({ type: "success" });
      },
    });

  return (
    <ContainerRow gutter={[16, 16]}>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical">
            <Title level={4}>Hoja 1</Title>
            <Sheet1Integration
              practice={practice}
              user={user}
              users={users}
              practitioner={practitioner}
              company={company}
              annex6={annex6}
              onSavePractice={onSavePractice}
            />
          </Space>
        </div>
      </Col>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical">
            <Title level={4}>Hoja 2</Title>
            <Sheet2Integration
              practice={practice}
              user={user}
              users={users}
              practitioner={practitioner}
              company={company}
              onSavePractice={onSavePractice}
              representativeCompany={representativeCompany}
              supervisor={supervisor}
            />
          </Space>
        </div>
      </Col>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical">
            <Title level={4}>Hoja 3</Title>
            <Sheet3Integration
              practice={practice}
              user={user}
              users={users}
              practitioner={practitioner}
              company={company}
              onSavePractice={onSavePractice}
            />
          </Space>
        </div>
      </Col>
      <br />
      <AnnexButtons
        hasPermissions={hasPermissions}
        practice={practice}
        onRefusedAnnex={onRefusedAnnex6}
        onApprovedAnnex={onApprovedAnnex4}
      />
    </ContainerRow>
  );
};

const ContainerRow = styled(Row)`
  .item-sheet {
    width: 100%;
    background: #f1f0f0;
    padding: 1em;
    border-radius: 1em;
  }

  .ant-space-item {
    width: 100%;
  }
`;
