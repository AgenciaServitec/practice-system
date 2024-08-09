import React, { useEffect } from "react";
import {
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Space } from "antd";
import styled from "styled-components";
import { Sheet1Integration } from "./Sheet1";
import { AnnexButtons } from "../AnnexButtons";
import { updateAnnex } from "../../../../../../firebase/collections/annexs";

export const Annex4Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
  annex4,
  onSavePractice,
}) => {
  useEffect(() => {
    (async () => {
      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex4;

      await updateAnnex(practice.id, "annex4", {
        status:
          approvedByCompanyRepresentative !== approvedByAcademicSupervisor
            ? "pending"
            : approvedByCompanyRepresentative === "approved" &&
              approvedByAcademicSupervisor === "approved"
            ? "approved"
            : approvedByCompanyRepresentative === "refused" &&
              approvedByAcademicSupervisor === "refused"
            ? "refused"
            : "pending",
      });
    })();
  }, [annex4]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const onApprovedAnnex4 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas aprovar el anexo 4?",
      content: "El anexo 4 pasara al estado de aprobado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para aprobar!",
          });
        }

        await updateAnnex(practice.id, "annex4", {
          ...(user.roleCode === "company_representative" && {
            approvedByCompanyRepresentative: "approved",
          }),
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: "approved",
          }),
        });

        notification({ type: "success" });
      },
    });

  const onRefusedAnnex4 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas rechazar el anexo 4?",
      content: "El anexo 4 pasara al estado de rechazado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para rechazar!",
          });
        }

        await updateAnnex(practice.id, "annex4", {
          ...(user.roleCode === "company_representative" && {
            approvedByCompanyRepresentative: "refused",
          }),
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: "refused",
          }),
        });

        notification({ type: "success" });
      },
    });

  return (
    <ContainerRow gutter={[16, 16]}>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={4}>Hoja de Evaluación</Title>
            <Sheet1Integration
              practice={practice}
              user={user}
              users={users}
              practitioner={practitioner}
              company={company}
              annex4={annex4}
              onSavePractice={onSavePractice}
            />
          </Space>
        </div>
      </Col>
      <br />
      <AnnexButtons
        annexName="annex4"
        hasPermissions={hasPermissions}
        practice={practice}
        onRefusedAnnex={onRefusedAnnex4}
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
