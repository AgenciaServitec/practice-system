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
import { now } from "../../../../../../firebase/utils";
import { useDefaultFirestoreProps } from "../../../../../../hooks";

export const Annex6Integration = ({
  user,
  practice,
  practitioner,
  annex6,
  company,
  representativeCompany,
  supervisor,
}) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  useEffect(() => {
    (async () => {
      if (isEmpty(practice) || isEmpty(annex6)) return;

      const { approvedByAcademicSupervisor } = annex6;

      await updateAnnex(practice.id, "annex6", {
        status: practicesStatus?.[approvedByAcademicSupervisor]?.value,
      });

      if (annex6?.status === "approved") {
        await updateAnnex(practice.id, "annex6", assignUpdateProps(annex6));
      }
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
