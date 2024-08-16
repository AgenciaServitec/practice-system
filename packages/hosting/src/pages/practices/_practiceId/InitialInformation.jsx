import React, { useState } from "react";
import Col from "antd/lib/col";
import { Title } from "../../../components";
import { ProfessionalCareer } from "../../../data-list";
import styled from "styled-components";
import { Button, Row } from "antd";
import { InformationModal } from "./InformationModal";
import { PractitionerInformation } from "./PractitionerInformation";

export const InitialInformation = ({
  practice,
  user,
  company,
  practitioner,
  supervisor,
  representativeCompany,
}) => {
  const [visibleModal, setVisibleModal] = useState(false);

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

  return (
    <>
      <Container>
        <Row gutter={[9, 9]}>
          <Col span={24} md={21}>
            <Title level={5} style={{ margin: "1px 0" }}>
              DATOS DEL PRACTICANTE
            </Title>
          </Col>
          <Col span={24} md={3}>
            <Button type="primary" block onClick={onOpenPracticeModal}>
              Ver más
            </Button>
          </Col>
        </Row>
        <PractitionerInformation
          practitioner={practitioner}
          professionalCareer={professionalCareer}
        />
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
