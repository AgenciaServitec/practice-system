import React, { useEffect, useState } from "react";
import {
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import styled from "styled-components";
import { updateAnnex } from "../../../../../../firebase/collections";
import { AnnexButtons } from "../AnnexButtons";
import { practicesStatus } from "../../../../../../data-list";
import { isEmpty } from "lodash";
import Col from "antd/lib/col";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";

export const Annex6Integration = ({
  user,
  practice,
  practitioner,
  annex6,
  company,
  representativeCompany,
  supervisor,
}) => {
  useEffect(() => {
    (async () => {
      if (isEmpty(practice) || isEmpty(annex6)) return;

      const { approvedByAcademicSupervisor } = annex6;

      await updateAnnex(practice.id, "annex6", {
        status: practicesStatus?.[approvedByAcademicSupervisor]?.value,
      });
    })();
  }, [annex6]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const onApprovedAnnex6 = async (practice) =>
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
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: "approved",
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
            <Title level={4}>Hoja 1</Title>
            <Sheet1Integration
              user={user}
              practice={practice}
              practitioner={practitioner}
              company={company}
              representativeCompany={representativeCompany}
              supervisor={supervisor}
            />
          </Space>
        </div>
      </Col>
      <AnnexButtons
        annexName="annex6"
        hasPermissions={hasPermissions}
        practice={practice}
        onRefusedAnnex={onRefusedAnnex6}
        onApprovedAnnex={onApprovedAnnex6}
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
