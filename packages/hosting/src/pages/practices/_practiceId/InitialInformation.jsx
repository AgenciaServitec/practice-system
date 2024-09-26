import React, { useEffect, useState } from "react";
import { Button, Col, Row, Title } from "../../../components";
import { ProfessionalCareer } from "../../../data-list";
import styled from "styled-components";
import { InformationModal } from "./InformationModal";
import { PractitionerInformation } from "./PractitionerInformation";
import { useApiPracticeReviewResubmissionPost } from "../../../api/useApiPracticeReviewResubmissionPost";
import { updatePractice } from "../../../firebase/collections";
import { now } from "../../../firebase/utils";
import dayjs from "dayjs";

export const InitialInformation = ({
  practice,
  user,
  company,
  practitioner,
  supervisor,
  representativeCompany,
}) => {
  const {
    postPracticeReviewResubmission,
    postPracticeReviewResubmissionLoading,
  } = useApiPracticeReviewResubmissionPost();

  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    if (user.roleCode !== "user" && timeDifference < 24) return;

    (async () => {
      if (timeDifference === 24) {
        await updatePractice(practice.id, {
          reviewResubmissionDate: now(),
        });
      }
    })();
  }, []);

  const onReviewResubmissionPractice = async (practice) => {
    try {
      await postPracticeReviewResubmission(practice.id);

      await updatePractice(practice.id, {
        reviewResubmissionDate: now(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onOpenPracticeModal = () => {
    setVisibleModal(true);
  };

  const onClosePracticeModal = () => {
    setVisibleModal(false);
  };

  const professionalCareer = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  );

  const isPractitioner = user?.roleCode === "user";

  const dateSend = dayjs(practice?.reviewResubmissionDate?.toDate()).format(
    "YYYY/MM/DD HH:mm"
  );

  const todayDate = dayjs().format("YYYY/MM/DD HH:mm");

  const timeDifference = dayjs(todayDate).diff(dayjs(dateSend), "hour");

  const resendTime = timeDifference < 24;

  return (
    <>
      <Container>
        <Row gutter={[9, 9]}>
          <Col span={24} xl={20}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={5} style={{ margin: "1px 0" }}>
                  DATOS DEL PRACTICANTE
                </Title>
              </Col>
              <Col span={24}>
                <PractitionerInformation
                  practitioner={practitioner}
                  professionalCareer={professionalCareer}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24} xl={4}>
            <WrapperButtons>
              <Button type="primary" block onClick={onOpenPracticeModal}>
                Ver más
              </Button>
              {isPractitioner && (
                <div>
                  <Button
                    type="primary"
                    danger
                    block
                    onClick={() => onReviewResubmissionPractice(practice)}
                    loading={postPracticeReviewResubmissionLoading}
                    disabled={
                      postPracticeReviewResubmissionLoading || resendTime
                    }
                  >
                    Reenviar correo para revisión
                  </Button>
                  {resendTime && (
                    <span className="message-review">
                      Disponible cada 24 hrs
                    </span>
                  )}
                </div>
              )}
            </WrapperButtons>
          </Col>
        </Row>
      </Container>
      <InformationModal
        open={visibleModal}
        onCancel={onClosePracticeModal}
        practitioner={practitioner}
        professionalCareer={professionalCareer}
        practice={practice}
        company={company}
        supervisor={supervisor}
        representativeCompany={representativeCompany}
      />
    </>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1em 1.7em;
  background: #f2f9ffff;
  border-radius: 1em;
  margin: 1em 0;

  .item {
    p:last-child {
      font-weight: 500;
      font-size: 1.1em;
      margin: 0.2em 0;
    }
  }
`;

const WrapperButtons = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  text-align: center;

  .message-review {
    font-size: 0.7rem;
    color: red;
  }
`;
