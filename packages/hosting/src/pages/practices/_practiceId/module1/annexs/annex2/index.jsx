import React, { useEffect, useState } from "react";
import {
  Acl,
  Button,
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

export const Annex2Integration = ({
  practice,
  user,
  practitioner,
  company,
  representativeCompany,
  annex2,
}) => {
  const [visibleForm, setVisibleForm] = useState(false);

  useEffect(() => {
    (async () => {
      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex2;

      await updateAnnex(practice.id, "annex2", {
        status:
          approvedByCompanyRepresentative && approvedByAcademicSupervisor
            ? "approved"
            : isUndefined(approvedByCompanyRepresentative) ||
              isUndefined(approvedByAcademicSupervisor)
            ? "pending"
            : "refused",
      });
    })();
  }, [annex2]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const onApprovedAnnex2 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas aprovar el anexo 2?",
      content: "El anexo 2 pasara al estado de aprobado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para aprobar!",
          });
        }

        await updateAnnex(practice.id, "annex2", {
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

  const onRefusedAnnex2 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas rechazar el anexo 2?",
      content: "El anexo 2 pasara al estado de rechazado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para rechazar!",
          });
        }

        await updateAnnex(practice.id, "annex2", {
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
      <Row>
        <Col span={24}>
          <div className="item-sheet">
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={4}>Hoja 1</Title>
              <Sheet1Integration
                practice={practice}
                user={user}
                practitioner={practitioner}
                representativeCompany={representativeCompany}
                company={company}
                annex2={annex2}
              />
            </Space>
          </div>
        </Col>
      </Row>
      <br />
      <AnnexButtons
        hasPermissions={hasPermissions}
        practice={practice}
        onSetVisibleForm={setVisibleForm}
        onRefusedAnnex={onRefusedAnnex2}
        onApprovedAnnex={onApprovedAnnex2}
      />
      <ObservationOfAnnexIntegration
        key={visibleForm}
        practice={practice}
        user={user}
        visibleForm={visibleForm}
        onSetVisibleForm={setVisibleForm}
        annex={annex2}
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
