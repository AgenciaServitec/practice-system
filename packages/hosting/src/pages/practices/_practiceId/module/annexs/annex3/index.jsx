import React, { useEffect, useState } from "react";
import {
  Col,
  modalConfirm,
  notification,
  Row,
  Space,
  Title,
} from "../../../../../../components";
import { Sheet1Integration } from "./Sheet1";
import styled from "styled-components";
import { updateAnnex } from "../../../../../../firebase/collections";
import { ObservationOfAnnexIntegration } from "../../../ObservationOfAnnex";
import { AnnexButtons } from "../AnnexButtons";
import { isEmpty } from "lodash";

export const Annex3Integration = ({ practice, annex3, user }) => {
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    (async () => {
      if (isEmpty(practice) || isEmpty(annex3)) return;

      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex3;

      await updateAnnex(practice.id, "annex3", {
        status:
          approvedByCompanyRepresentative !== approvedByAcademicSupervisor
            ? "pending"
            : approvedByCompanyRepresentative === "approved" &&
              approvedByAcademicSupervisor === "approved"
            ? "approved"
            : "pending",
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
            approvedByCompanyRepresentative: "approved",
          }),
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: "approved",
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
            <Space direction="vertical" style={{ width: "100%" }}>
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
    padding: 1em;
    background: #fff;
    border: 1px solid #dfdfdf;
  }

  .ant-space-item {
    width: 100%;
  }
`;
