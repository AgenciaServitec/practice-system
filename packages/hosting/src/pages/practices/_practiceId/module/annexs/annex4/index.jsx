import React, { useEffect } from "react";
import {
  Col,
  modalConfirm,
  notification,
  Row,
  Space,
  Title,
} from "../../../../../../components";
import styled from "styled-components";
import { Sheet1Integration } from "./Sheet1";
import { AnnexButtons } from "../AnnexButtons";
import { updateAnnex } from "../../../../../../firebase/collections";
import { isEmpty } from "lodash";
import { useDefaultFirestoreProps } from "../../../../../../hooks";

export const Annex4Integration = ({ practice, user, annex4 }) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  useEffect(() => {
    (async () => {
      if (isEmpty(practice) || isEmpty(annex4)) return;

      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex4;

      await updateAnnex(practice.id, "annex4", {
        status:
          approvedByCompanyRepresentative !== approvedByAcademicSupervisor
            ? "pending"
            : approvedByCompanyRepresentative === "approved" &&
              approvedByAcademicSupervisor === "approved"
            ? "approved"
            : "pending",
      });

      if (annex4?.status === "approved") {
        await updateAnnex(practice.id, "annex4", assignUpdateProps(annex4));
      }
    })();
  }, [annex4]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const annex4ApprovedSupervisor =
    user.roleCode === "academic_supervisor" && isEmpty(annex4?.evaluationSheet);

  const annex4ApprovedRepresentativeCompany =
    user.roleCode === "company_representative" &&
    isEmpty(annex4?.evaluationSheet);

  const onApprovedAnnex4 = async (practice) => {
    if (annex4ApprovedSupervisor || annex4ApprovedRepresentativeCompany)
      return notification({
        type: "warning",
        title:
          "Por favor, antes de aprobar el anexo debe verificar que se haya completado la evaluación del practicante.",
      });

    return modalConfirm({
      title: "Seguro que deseas aprobar el anexo 4?",
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
  };

  return (
    <ContainerRow gutter={[16, 16]}>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={4}>Hoja de Evaluación</Title>
            <Sheet1Integration
              practice={practice}
              user={user}
              annex4={annex4}
            />
          </Space>
        </div>
      </Col>
      <br />
      <AnnexButtons
        annexName="annex4"
        hasPermissions={hasPermissions}
        practice={practice}
        onApprovedAnnex={onApprovedAnnex4}
      />
    </ContainerRow>
  );
};

const ContainerRow = styled(Row)`
  .item-sheet {
    width: 100%;
    padding: 1em;
    background: #fff;
    border: 1px solid #dfdfdf;
  }

  .ant-space-item {
    width: 100%;
  }
`;
