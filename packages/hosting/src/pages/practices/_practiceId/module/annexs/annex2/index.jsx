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
import { now } from "../../../../../../firebase/utils";
import { useDefaultFirestoreProps } from "../../../../../../hooks";

export const Annex2Integration = ({
  practice,
  user,
  practitioner,
  company,
  representativeCompany,
  annex2,
}) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();
  const [visibleForm, setVisibleForm] = useState(false);

  const observations = [
    ...(annex2?.observationsAcademicSupervisor || []),
    ...(annex2?.observationsCompanyRepresentative || []),
  ];

  const isExistsObservations = (observations || []).some(
    (observation) => observation?.status === "pending"
  );

  useEffect(() => {
    (async () => {
      if (isEmpty(practice) || isEmpty(annex2)) return;

      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex2;

      await updateAnnex(practice.id, "annex2", {
        status:
          approvedByCompanyRepresentative !== approvedByAcademicSupervisor
            ? "pending"
            : approvedByCompanyRepresentative === "approved" &&
              approvedByAcademicSupervisor === "approved"
            ? "approved"
            : "pending",
        ...(annex2?.status === "approved" && { updateAt: now() }),
      });

      if (annex2?.status === "approved") {
        await updateAnnex(practice.id, "annex2", assignUpdateProps(annex2));
      }
    })();
  }, [annex2]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const onApprovedAnnex2 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas aprobar el anexo 2?",
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
        annexName="annex2"
        hasPermissions={hasPermissions}
        practice={practice}
        annex={annex2}
        onSetVisibleForm={setVisibleForm}
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
    padding: 1em;
    background: #fff;
    border: 1px solid #dfdfdf;
  }
  .ant-space-item {
    width: 100%;
  }
`;
