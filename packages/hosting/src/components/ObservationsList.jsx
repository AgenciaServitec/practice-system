import React from "react";
import { Acl, Alert, Button, Col, modalConfirm, Row } from "../components";
import styled from "styled-components";
import dayjs from "dayjs";
import { isEmpty } from "lodash";
import { updateAnnex, updatePractice } from "../firebase/collections";

export const ObservationsList = ({
  annex = {},
  observationsPractice = [],
  practice,
}) => {
  const {
    observationsAcademicSupervisor = [],
    observationsCompanyRepresentative = [],
  } = annex;

  const observations = {
    observationsAcademicSupervisor: observationsAcademicSupervisor,
    observationsCompanyRepresentative: observationsCompanyRepresentative,
    observationsPractice: observationsPractice,
  };

  const findObservation = (observationId, observationsType) =>
    observations[observationsType].find(
      (observation) => observation?.id === observationId
    );

  const excludeObservacion = (observationId, observationsType) =>
    observations[observationsType].filter(
      (_observation) => _observation?.id !== observationId
    );

  const updateObservation = async (
    observationId,
    observationsType,
    newData
  ) => {
    const observation = findObservation(observationId, observationsType);
    const oldObservations = excludeObservacion(observationId, observationsType);

    const newObservations = [
      ...oldObservations,
      observation && {
        ...observation,
        ...newData,
      },
    ];

    if (isEmpty(annex)) {
      await updatePractice(practice.id, {
        [observationsType]: newObservations,
      });
    }

    if (isEmpty(observationsPractice)) {
      await updateAnnex(practice.id, annex.id, {
        [observationsType]: newObservations,
      });
    }
  };

  const onResolveObservation = (observationId, observationsType) =>
    modalConfirm({
      title: "¿Esta seguro que resolvió la observación?",
      onOk: async () => {
        await updateObservation(observationId, observationsType, {
          status: "resolved",
          updateAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        });
      },
    });

  const onCloseObservation = (observationId, observationsType) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres cerrar esta observación?",
      onOk: async () => {
        await updateObservation(observationId, observationsType, {
          isDeleted: true,
          updateAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        });
      },
    });

  const observationsView = (observations) =>
    (observations || []).filter(
      (_observation) => _observation.isDeleted === false
    );

  return (
    <Container gutter={[16, 16]}>
      <Acl name="/practices/:practiceId/annex#observations">
        <>
          {observationsView(observationsPractice).map((observation, index) => (
            <Col span={24} key={index}>
              <Alert
                type={observation.status === "pending" ? "warning" : "success"}
                showIcon
                message="Observación"
                description={observation.value}
                action={
                  <>
                    <Acl name="/practices/:practiceId#observationModuleResolver">
                      {observation.status === "pending" && (
                        <Button
                          size="small"
                          type="primary"
                          onClick={() =>
                            onResolveObservation(
                              observation.id,
                              "observationsPractice"
                            )
                          }
                        >
                          Resolver
                        </Button>
                      )}
                    </Acl>
                    <Acl name="/practices/:practiceId#observationModuleClose">
                      {observation.status === "resolved" && (
                        <Button
                          size="small"
                          danger
                          onClick={() =>
                            onCloseObservation(
                              observation.id,
                              "observationsPractice"
                            )
                          }
                        >
                          Cerrar
                        </Button>
                      )}
                    </Acl>
                  </>
                }
              />
            </Col>
          ))}
          {observationsView(observationsAcademicSupervisor).map(
            (observation, index) => (
              <Col span={24} key={index}>
                <Alert
                  type={
                    observation.status === "pending" ? "warning" : "success"
                  }
                  showIcon
                  message="Observación"
                  description={observation.value}
                  action={
                    <>
                      <Acl name="/practices/:practiceId/annex#observationResolver">
                        {observation.status === "pending" && (
                          <Button
                            size="small"
                            type="primary"
                            onClick={() =>
                              onResolveObservation(
                                observation.id,
                                "observationsAcademicSupervisor"
                              )
                            }
                          >
                            Resolver
                          </Button>
                        )}
                      </Acl>
                      <Acl name="/practices/:practiceId/annex#observationClose">
                        {observation.status === "resolved" && (
                          <Button
                            size="small"
                            danger
                            onClick={() =>
                              onCloseObservation(
                                observation.id,
                                "observationsAcademicSupervisor"
                              )
                            }
                          >
                            Cerrar
                          </Button>
                        )}
                      </Acl>
                    </>
                  }
                />
              </Col>
            )
          )}
          {observationsView(observationsCompanyRepresentative).map(
            (observation, index) => (
              <Col span={24} key={index}>
                <Alert
                  type={
                    observation.status === "pending" ? "warning" : "success"
                  }
                  showIcon
                  message="Observación"
                  description={observation.value}
                  action={
                    <>
                      <Acl name="/practices/:practiceId/annex#observationResolver">
                        {observation.status === "pending" && (
                          <Button
                            size="small"
                            type="primary"
                            onClick={() =>
                              onResolveObservation(
                                observation.id,
                                "observationsCompanyRepresentative"
                              )
                            }
                          >
                            Resolver
                          </Button>
                        )}
                      </Acl>
                      <Acl name="/practices/:practiceId/annex#observationClose">
                        {observation.status === "resolved" && (
                          <Button
                            size="small"
                            danger
                            onClick={() =>
                              onCloseObservation(
                                observation.id,
                                "observationsCompanyRepresentative"
                              )
                            }
                          >
                            Cerrar
                          </Button>
                        )}
                      </Acl>
                    </>
                  }
                />
              </Col>
            )
          )}
        </>
      </Acl>
    </Container>
  );
};

const Container = styled(Row)`
  width: 100%;
`;
