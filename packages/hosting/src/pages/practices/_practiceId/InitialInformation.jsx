import React from "react";
import Col from "antd/lib/col";
import { Title } from "../../../components";
import { fullName } from "../../../utils";
import dayjs from "dayjs";
import {
  BusinessPosition,
  PracticeArea,
  ProfessionalCareer,
} from "../../../data-list";
import styled from "styled-components";
import { Row } from "antd";

export const InitialInformation = ({
  practice,
  users,
  user,
  companies,
  company,
  practitioner,
  supervisor,
  representativeCompany,
}) => {
  const businessPosition = BusinessPosition.find(
    (position) =>
      position?.value ===
      representativeCompany?.companyRepresentativeData?.businessPosition
  );

  const professionalCareer = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  );

  return (
    <Container>
      <Row gutter={[9, 9]}>
        <Col span={24}>
          <Title level={5} style={{ margin: "1px 0" }}>
            DATOS DEL PRACTICANTE
          </Title>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Apellidos y Nombres: </label>
            <p>{fullName(practitioner) || "-"}</p>
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
            <label>Turno: </label>
            <p>{practitioner?.practitionerData?.studentShift || "Egresado"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Semestre: </label>
            <p>{practitioner?.practitionerData?.semester || "Egresado"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Año Académico: </label>
            <p>{practitioner?.practitionerData?.academicYear || "Egresado"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>
              Período de Estudios (Año de Ingreso - Año de Egreso):{" "}
            </label>
            <p>
              {`${practitioner?.practitionerData?.entryYear} - ${practitioner?.practitionerData?.yearGraduation}` ||
                "Egresado"}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Domicilio:</label>
            <p>{practitioner?.address || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Teléfonos (Domicilio - Personal):</label>
            <p>{`${user?.phone?.prefix} ${user?.phone?.number}` || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Correo Electrónico:</label>
            <p>{user?.email || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>DNI:</label>
            <p>{user?.dni || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Código de Matrícula:</label>
            <p>{practitioner?.practitionerData?.tuitionId || "-"}</p>
          </div>
        </Col>
      </Row>
      <br />
      <Row gutter={[9, 9]}>
        <Col span={24}>
          <Title level={5} style={{ margin: "1px 0" }}>
            DATOS DE LA EMPRESA O INSTITUCIÓN
          </Title>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Razón Social de la Empresa: </label>
            <p>{company?.socialReason || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>N° RUC: </label>
            <p>{company?.ruc || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Dirección: </label>
            <p>{company?.address || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Distrito: </label>
            <p>{company?.district || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Ciudad: </label>
            <p>{company?.province || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Región: </label>
            <p>{company?.region || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Teléfono: </label>
            <p>
              {`${representativeCompany?.phone?.prefix} ${representativeCompany?.phone?.number}` ||
                "-"}
            </p>
          </div>
        </Col>

        <Col span={24} md={8}>
          <div className="item">
            <label>Correo Electrónico: </label>
            <p>{company?.email || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Página Web: </label>
            <p>{company?.webSite || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>
              Encargado del control de Prácticas Pre-Profesionales:{" "}
            </label>
            <p>{fullName(representativeCompany)}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Cargo: </label>
            <p>{businessPosition?.label || "-"}</p>
          </div>
        </Col>
      </Row>
      <br />
      <Row gutter={[9, 9]}>
        <Col span={24}>
          <Title level={5} style={{ margin: "1px 0" }}>
            LA EMPRESA O INSTITUCIÓN OFRECE LO SIGUIENTE
          </Title>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Período de la Práctica y Evaluación: </label>
            <p>
              {dayjs(practice?.startDate, "D/MM/YY").format("D MMMM YYYY")} -{" "}
              {dayjs(practice?.endDate, "D/MM/YY").format("D MMMM YYYY")}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Horario: </label>
            <p>
              {dayjs(practice?.entryTime, "HH:mm:ss").format("HH:mm a")} -
              {dayjs(practice?.departureTime, "HH:mm:ss").format("HH:mm a")}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Dpto. Sector o Área de las Prácticas: </label>
            <p>{PracticeArea?.[practice?.practiceArea]?.name || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div className="item">
            <label>Total de horas de las Prácticas: </label>
            <p>{practice?.hours || "-"}</p>
          </div>
        </Col>
      </Row>
    </Container>
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
      text-transform: capitalize;
      font-size: 1.1em;
      margin: 0.2em 0;
    }
  }
`;
