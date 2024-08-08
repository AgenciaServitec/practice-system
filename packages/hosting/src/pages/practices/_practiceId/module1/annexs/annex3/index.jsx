import React, { useEffect, useState } from "react";
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
import { updateAnnex } from "../../../../../../firebase/collections/annexs";
import { ObservationOfAnnexIntegration } from "../../../ObservationOfAnnex";
import { isUndefined } from "lodash";
import { AnnexButtons } from "../AnnexButtons";

export const Annex3Integration = ({ practice, annex3, user }) => {
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    (async () => {
      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex3;

      await updateAnnex(practice.id, "annex3", {
        status:
          approvedByCompanyRepresentative && approvedByAcademicSupervisor
            ? "approved"
            : isUndefined(approvedByCompanyRepresentative) ||
              isUndefined(approvedByAcademicSupervisor)
            ? "pending"
            : "refused",
      });
    })();
  }, [annex3]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const onApprovedAnnex3 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas aprovar el anexo 3?",
      content: "El anexo 3 pasara al estado de aprobado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para aprobar!",
          });
        }

        await updateAnnex(practice.id, "annex3", {
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

  const onRefusedAnnex3 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas rechazar el anexo 3?",
      content: "El anexo 3 pasara al estado de rechazado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para rechazar!",
          });
        }

        await updateAnnex(practice.id, "annex3", {
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
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="item-sheet">
            <Space direction="vertical">
              <Title level={4}>Hoja 1</Title>
              <Sheet1Integration
                practice={practice}
                annex3={annex3}
                user={user}
              />
            </Space>
          </div>
        </Col>
      </Row>
      <br />
      <AnnexButtons
        annexName="annex3"
        hasPermissions={hasPermissions}
        practice={practice}
        onSetVisibleForm={setVisibleForm}
        onRefusedAnnex={onRefusedAnnex3}
        onApprovedAnnex={onApprovedAnnex3}
      />
      <ObservationOfAnnexIntegration
        key={visibleForm}
        practice={practice}
        user={user}
        visibleForm={visibleForm}
        onSetVisibleForm={setVisibleForm}
        annex={annex3}
      />
    </Container>
  );
};

const Container = styled.div`
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
