import React, { useEffect } from "react";
import styled from "styled-components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Title,
} from "../../../../../../../components";

export const Sheet1Integration = ({
  annex4,
  user,
  practice,
  practitioner,
  
}) => {
  return (
    <Sheet1
      annex4={annex4}
      user={user}
      practice={practice}
      practitioner={practitioner}
    />
  );
};

const Sheet1 = ({ annex4, user, practice ,practitioner}) => {
 
console.log("annex4: ",annex4);
console.log("user: ",user);
console.log("practice: ",practice);
console.log("practitioner: ",practitioner);

  return (
    <Container>
      <Row gutter={[16,16]}>
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
            <p>{practitioner?.ProfessionalCareer || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Turno: </label>
            <p>{practitioner?.shift || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Semestre: </label>
            <p>{practitioner?.semester || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Año Académico: </label>
            <p>{practitioner?.academicYear || "-"}</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  div{
    p:last-child{
      font-weight: 500;
      text-transform: capitalize;
      font-size: 1.1em;
      margin: 0;
    }
  }
`;
