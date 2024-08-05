import React from "react";
import Col from "antd/lib/col";
import { Alert, Row } from "antd";
import { Acl, Button, modalConfirm } from "../../../../components";
import { updateAnnex } from "../../../../firebase/collections/annexs";
import styled from "styled-components";
import dayjs from "dayjs";

export const ObservationsList = ({ user, annex, practice }) => {
  const {
    observationsAcademicSupervisor = [],
    observationsCompanyRepresentative = [],
  } = annex;
  const observations = {
    company_representative: observationsCompanyRepresentative,
    academic_supervisor: observationsAcademicSupervisor,
  };

  const resolvedObservation = async (observationId) =>
    modalConfirm({
      title: "¿Esta seguro que resolvió la observación?",
      onOk: async () => {
        const observationsList = observations[user.roleCode];
        const observation = observationsList.find(
          (observation) => observation.id === observationId
        );

        const oldObservations = observationsList.filter(
          (_observation) => _observation.id !== observationId
        );

        const newObservations = [
          ...oldObservations,
          observation && {
            ...observation,
            status: "resolved",
            updateAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
          },
        ];

        await updateAnnex(practice.id, annex.id, {
          ...(user.roleCode === "company_representative" && {
            observationsCompanyRepresentative: newObservations,
          }),
          ...(user.roleCode === "academic_supervisor" && {
            observationsAcademicSupervisor: newObservations,
          }),
        });
      },
    });

  return (
    <Container gutter={[16, 16]}>
      <Acl name="/practices/:practiceId/annex#observations">
        <>
          {observationsAcademicSupervisor
            .filter((observation) => observation.status === "pending")
            .map((observation, index) => (
              <Col span={24} key={index}>
                <Alert
                  type="warning"
                  showIcon
                  message="Observación"
                  description={observation.value}
                  action={
                    <Acl name="/practices/:practiceId/annex#observationResolver">
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => resolvedObservation(observation.id)}
                      >
                        Resolver
                      </Button>
                    </Acl>
                  }
                />
              </Col>
            ))}
          {observationsCompanyRepresentative
            .filter((observation) => observation.status === "pending")
            .map((observation, index) => (
              <Col span={24} key={index}>
                <Alert
                  type="warning"
                  showIcon
                  message="Observación"
                  description={observation.value}
                  action={
                    <Acl name="/practices/:practiceId/annex#observationResolver">
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => resolvedObservation(observation.id)}
                      >
                        Resolver
                      </Button>
                    </Acl>
                  }
                />
              </Col>
            ))}
        </>
      </Acl>
    </Container>
  );
};

const Container = styled(Row)`
  width: 100%;
`;
