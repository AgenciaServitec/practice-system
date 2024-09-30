import React from "react";
import {
  Col,
  DataEntryModal,
  Divider,
  Row,
  Skeleton,
  Timeline,
} from "../../components";
import { faCircleCheck, faClock } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { PracticeProgress } from "../../data-list";
import dayjs from "dayjs";

export const PracticeProgressModal = ({
  open,
  onCancel,
  practiceProgress,
  practiceProgressLoading,
}) => {
  const { registerPractice, annex2, annex3, annex4, annex6, approvedPractice } =
    practiceProgress;

  const isRegister = registerPractice?.practice?.status === "pending";
  const isAnnex2Approved = annex2?.status === "approved";
  const isAnnex3Approved = annex3?.status === "approved";
  const isAnnex4Approved = annex4?.status === "approved";
  const isAnnex6Approved = annex6?.status === "approved";
  const isPracticeApproved = approvedPractice?.practice?.status === "approved";

  const isActive = (condition) =>
    condition ? (
      <FontAwesomeIcon icon={faCircleCheck} size="2x" />
    ) : (
      <FontAwesomeIcon icon={faClock} size="2x" />
    );

  return (
    <DataEntryModal
      title="Proceso de la Práctica"
      visible={open}
      onCancel={onCancel}
    >
      {practiceProgressLoading ? (
        <>
          <Skeleton
            avatar
            paragraph={{
              rows: 3,
            }}
          />
          <Skeleton
            avatar
            paragraph={{
              rows: 3,
            }}
          />
          <Skeleton
            avatar
            paragraph={{
              rows: 3,
            }}
          />
          <Skeleton
            avatar
            paragraph={{
              rows: 3,
            }}
          />
          <Skeleton
            avatar
            paragraph={{
              rows: 3,
            }}
          />
        </>
      ) : (
        <>
          <Divider />
          <Row justify="center">
            <Col span={24}>
              <Timeline
                items={[
                  {
                    dot: <FontAwesomeIcon icon={faCircleCheck} size="2x" />,
                    color: "green",
                    children: (
                      <PracticeProgressDescription
                        date={dayjs(
                          approvedPractice?.practice?.createAt?.toDate()
                        ).format("DD/MM/YYYY HH:mm a")}
                        title="Registro"
                        description={
                          isRegister
                            ? PracticeProgress.register.succes
                            : PracticeProgress.register.pending
                        }
                      />
                    ),
                  },
                  {
                    dot: isActive(isAnnex2Approved),
                    color: isAnnex2Approved ? "green" : "gray",
                    children: (
                      <PracticeProgressDescription
                        date={
                          isAnnex2Approved &&
                          dayjs(annex2?.updateAt?.toDate()).format(
                            "DD/MM/YYYY HH:mm a"
                          )
                        }
                        title="Anexo 2"
                        description={
                          isAnnex2Approved
                            ? PracticeProgress.annex2Approved.succes
                            : PracticeProgress.annex2Approved.pending
                        }
                      />
                    ),
                  },
                  {
                    dot: isActive(isAnnex3Approved),
                    color: isAnnex3Approved ? "green" : "gray",
                    children: (
                      <PracticeProgressDescription
                        date={
                          isAnnex3Approved &&
                          dayjs(annex3?.updateAt?.toDate()).format(
                            "DD/MM/YYYY HH:mm a"
                          )
                        }
                        title="Anexo 3"
                        description={
                          isAnnex3Approved
                            ? PracticeProgress.annex3Approved.succes
                            : PracticeProgress.annex3Approved.pending
                        }
                      />
                    ),
                  },
                  {
                    dot: isActive(isAnnex4Approved),
                    color: isAnnex4Approved ? "green" : "gray",
                    children: (
                      <PracticeProgressDescription
                        date={
                          isAnnex4Approved &&
                          dayjs(annex4?.updateAt?.toDate()).format(
                            "DD/MM/YYYY HH:mm a"
                          )
                        }
                        title="Anexo 4"
                        description={
                          isAnnex4Approved
                            ? PracticeProgress.annex4Approved.succes
                            : PracticeProgress.annex4Approved.pending
                        }
                      />
                    ),
                  },
                  {
                    dot: isActive(isAnnex6Approved),
                    color: isAnnex6Approved ? "green" : "gray",
                    children: (
                      <PracticeProgressDescription
                        date={
                          isAnnex6Approved &&
                          dayjs(annex6?.updateAt?.toDate()).format(
                            "DD/MM/YYYY HH:mm a"
                          )
                        }
                        title="Anexo 6"
                        description={
                          isAnnex6Approved
                            ? PracticeProgress.annex6Approved.succes
                            : PracticeProgress.annex6Approved.pending
                        }
                      />
                    ),
                  },
                  {
                    dot: isActive(isPracticeApproved),
                    color: isPracticeApproved ? "green" : "gray",
                    children: (
                      <PracticeProgressDescription
                        date={
                          isPracticeApproved &&
                          dayjs(
                            approvedPractice?.practice?.updateAt?.toDate()
                          ).format("DD/MM/YYYY HH:mm a")
                        }
                        title="Completado"
                        description={
                          isPracticeApproved
                            ? PracticeProgress.practiceApproved.succes
                            : PracticeProgress.practiceApproved.pending
                        }
                      />
                    ),
                  },
                ]}
              />
            </Col>
          </Row>
        </>
      )}
    </DataEntryModal>
  );
};

const PracticeProgressDescription = ({ date, title, description }) => {
  return (
    <WrapperContent>
      <span>{date || "--/--/---- --:--"}</span>
      <h5>{title}</h5>
      <p>{description}</p>
      <Divider />
    </WrapperContent>
  );
};

const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
