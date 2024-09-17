import React from "react";
import { fullName } from "../../../utils";
import { Col, Row } from "../../../components";
import styled from "styled-components";

export const PractitionerInformation = ({
  practitioner,
  professionalCareer,
}) => {
  return (
    <Container gutter={[16, 16]}>
      <Col span={24} md={8}>
        <div className="item">
          <p>Código de Matrícula:</p>
          <p>{practitioner?.practitionerData?.tuitionId || "-"}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <p>Apellidos y Nombres: </p>
          <p className="capitalize">{fullName(practitioner) || "-"}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <p>Carrera Profesional: </p>
          <p>{professionalCareer?.label || ""}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <p>Teléfonos (Domicilio - Personal):</p>
          <p>
            {`${practitioner?.phone?.prefix} ${practitioner?.phone?.number}` ||
              "-"}
          </p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <p>Correo Electrónico:</p>
          <p>{practitioner?.email || "-"}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <p>DNI:</p>
          <p>{practitioner?.dni || "-"}</p>
        </div>
      </Col>
    </Container>
  );
};

const Container = styled(Row)`
  background: #f2f9ffff;
  border-radius: 1em;
  padding: 1em 0;

  .item {
    p:first-child {
      font-size: 0.85em;
      font-weight: 500;
      color: rgb(55, 79, 93);
      line-height: 1.1em;
      margin: 0.3em 0;
    }

    p:last-child {
      font-weight: 500;
      font-size: 1.05em;
      margin: -4px 0;
    }
  }
`;
