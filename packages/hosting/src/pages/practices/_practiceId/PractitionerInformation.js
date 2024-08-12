import React from "react";
import { fullName } from "../../../utils";
import { Col, Row } from "../../../components";

export const PractitionerInformation = ({
  practitioner,
  professionalCareer,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} md={8}>
        <div className="item">
          <label>Código de Matrícula:</label>
          <p>{practitioner?.practitionerData?.tuitionId || "-"}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <label>Apellidos y Nombres: </label>
          <p className="capitalize">{fullName(practitioner) || "-"}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <label>Carrera Profesional: </label>
          <p>{professionalCareer?.label || ""}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <label>Teléfonos (Domicilio - Personal):</label>
          <p>
            {`${practitioner?.phone?.prefix} ${practitioner?.phone?.number}` ||
              "-"}
          </p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <label>Correo Electrónico:</label>
          <p>{practitioner?.email || "-"}</p>
        </div>
      </Col>
      <Col span={24} md={8}>
        <div className="item">
          <label>DNI:</label>
          <p>{practitioner?.dni || "-"}</p>
        </div>
      </Col>
    </Row>
  );
};
