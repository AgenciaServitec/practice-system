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
import { useDefaultFirestoreProps } from "../../../../../../hooks";
import { scrollStyle } from "../../../../../../styles";

export const Annex3Integration = ({
  refAnnex3,
  refAnnex4,
  practice,
  annex3,
  user,
}) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();
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

      if (annex3?.status === "approved") {
        await updateAnnex(practice.id, "annex3", assignUpdateProps(annex3));
      }
    })();
  }, [annex3]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const annex3FieldsSupervisor =
    user.roleCode === "academic_supervisor" &&
    isEmpty(
      annex3?.visitNumber ||
        annex3?.supervisionDate ||
        annex3?.progressStatus ||
        annex3?.observations
    );

  const annex3FieldsRepresentativeCompany =
    user.roleCode === "company_representative" &&
    isEmpty(annex3.difficultiesDetected || annex3.suggestionsRecommendations);

  const onApprovedAnnex3 = async (practice) => {
    if (annex3FieldsSupervisor || annex3FieldsRepresentativeCompany)
      return notification({
        type: "warning",
        title:
          "Por favor, antes de aprobar el anexo debe verificar que los campos no estén vacíos.",
      });

    return modalConfirm({
      title: "Seguro que deseas aprobar el anexo 3?",
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

        refAnnex4?.current && refAnnex4.current.scrollIntoView(scrollStyle);
      },
    });
  };

  return (
    <Container ref={refAnnex3}>
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
        annex={annex3}
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
