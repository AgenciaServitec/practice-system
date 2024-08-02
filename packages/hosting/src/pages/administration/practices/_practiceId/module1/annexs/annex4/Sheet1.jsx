import React from "react";
import styled from "styled-components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Title } from "../../../../../../../components";
import { ProfessionalCareer } from "../../../../../../../data-list";

export const Sheet1Integration = ({ annex4, user, practice, practitioner }) => {
  return (
    <Sheet1
      annex4={annex4}
      user={user}
      practice={practice}
      practitioner={practitioner}
    />
  );
};

const Sheet1 = ({ practitioner, user }) => {
  const ProfessionalCareerValue = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  )?.label;

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>I. DATOS PERSONALES</Title>
        </Col>
        <Col span={24} md={12}>
          <div>
            <label>Apellidos y Nombres: </label>
            <p>
              {`${practitioner?.paternalSurname} ${practitioner?.maternalSurname} ${practitioner?.firstName}` ||
                "-"}
            </p>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div>
            <label>Carrera Profesional: </label>
            <p>{ProfessionalCareerValue || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Turno: </label>
            <p>{practitioner?.practitionerData?.studentShift || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Semestre: </label>
            <p>{practitioner?.practitionerData?.semester || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Año Académico: </label>
            <p>{practitioner?.practitionerData?.academicYear || "-"}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  div {
    p:last-child {
      font-weight: 500;
      text-transform: capitalize;
      font-size: 1.1em;
      margin: 0;
    }
  }
`;
