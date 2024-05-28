import React, { useEffect } from "react";
import {
  Acl,
  Button,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";
import styled from "styled-components";
import { updateAnnex } from "../../../../../../../firebase/collections/annexs";

export const Annex2Integration = ({
  practice,
  practitioner,
  company,
  annex2,
  user,
}) => {
  useEffect(() => {
    (async () => {
      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex2;

      await updateAnnex(practice.id, "annex2", {
        status:
          approvedByCompanyRepresentative && approvedByAcademicSupervisor
            ? "approved"
            : !approvedByCompanyRepresentative && !approvedByAcademicSupervisor
            ? "refused"
            : "pending",
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
            <Space direction="vertical">
              <Title level={4}>Hoja 1</Title>
              <Sheet1Integration
                practice={practice}
                practitioner={practitioner}
                company={company}
                annex2={annex2}
              />
            </Space>
          </div>
        </Col>
      </Row>
      <br />
      <Row justify="end" gutter={[16, 16]}>
        <Acl name="/practices/:practiceId/annex#refused">
          <Col span={24} sm={6} md={6}>
            <Button
              type="primary"
              danger
              size="large"
              block
              onClick={() => onRefusedAnnex2(practice)}
            >
              Rechazar Anexo 2
            </Button>
          </Col>
        </Acl>
        <Acl name="/practices/:practiceId/annex#approved">
          <Col span={24} sm={6} md={6}>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => onApprovedAnnex2(practice)}
            >
              Aprobar Anexo 2
            </Button>
          </Col>
        </Acl>
      </Row>
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
