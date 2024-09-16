import React from "react";
import { Col, DataEntryModal, Row, Title } from "../../../components/ui";
import { fullName } from "../../../utils";
import dayjs from "dayjs";
import { BusinessPosition, PracticeArea } from "../../../data-list";
import styled from "styled-components";

export const InformationModal = ({
  open,
  onCancel,
  practitioner,
  professionalCareer,
  practice,
  company,
  representativeCompany,
  supervisor,
}) => {
  const businessPosition = BusinessPosition.find(
    (position) =>
      position?.value ===
      representativeCompany?.companyRepresentativeData?.businessPosition
  );

  return (
    <DataEntryModal visible={open} onCancel={onCancel}>
      <Container>
        <div className="card-item">
          <Row gutter={[13, 13]}>
            <Col span={24} md={24}>
              <Title level={5} style={{ margin: "1px 0" }}>
                DATOS DEL PRACTICANTE:
              </Title>
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
                <p>Turno: </p>
                <p className="capitalize">
                  {practitioner?.practitionerData?.studentShift || "Egresado"}
                </p>
              </div>
            </Col>
            <Col span={24} md={12}>
              <div className="item">
                <p>Período de Estudios (Año de Ingreso - Año de Egreso): </p>
                <p>
                  {practitioner?.practitionerData?.entryYear} -{" "}
                  {practitioner?.practitionerData?.yearGraduation || "En curso"}
                </p>
              </div>
            </Col>
            <Col span={24} md={12}>
              <div className="item">
                <p>Semestre: </p>
                <p className="capitalize">
                  {practitioner?.practitionerData?.semester || "Egresado"}
                </p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Año Académico: </p>
                <p>
                  {practitioner?.practitionerData?.academicYear || "Egresado"}
                </p>
              </div>
            </Col>

            <Col span={24} md={8}>
              <div className="item">
                <p>Domicilio:</p>
                <p>{practitioner?.address || "-"}</p>
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
            <Col span={24} md={10}>
              <div className="item">
                <p>Correo Electrónico:</p>
                <p>{practitioner?.email || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={7}>
              <div className="item">
                <p>DNI:</p>
                <p>{practitioner?.dni || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={7}>
              <div className="item">
                <p>Código de Matrícula:</p>
                <p>{practitioner?.practitionerData?.tuitionId || "-"}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="card-item">
          <Row gutter={[13, 13]}>
            <Col span={24}>
              <Title level={5} style={{ margin: "1px 0" }}>
                DATOS DE LA EMPRESA O INSTITUCIÓN:
              </Title>
            </Col>
            <Col span={24} md={6}>
              <div className="item">
                <p>N° RUC: </p>
                <p>{company?.ruc || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Razón Social de la Empresa: </p>
                <p className="capitalize">{company?.socialReason || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={10}>
              <div className="item">
                <p>Dirección: </p>
                <p>{company?.address || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={6}>
              <div className="item">
                <p>Distrito: </p>
                <p className="capitalize">{company?.district || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={6}>
              <div className="item">
                <p>Ciudad: </p>
                <p className="capitalize">{company?.province || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={6}>
              <div className="item">
                <p>Región: </p>
                <p className="capitalize">{company?.region || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={6}>
              <div className="item">
                <p>Teléfono: </p>
                <p>
                  {`${representativeCompany?.phone?.prefix} ${representativeCompany?.phone?.number}` ||
                    "-"}
                </p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Correo Electrónico: </p>
                <p>{company?.email || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Página Web: </p>
                <p>{company?.webSite || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Jefe o Autoridad Principal de la Empresa: </p>
                <p className="capitalize">{fullName(representativeCompany)}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Cargo de la Autoridad Principal: </p>
                <p>{businessPosition?.label || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Supervisor designado por la empresa: </p>
                <p className="capitalize">{fullName(representativeCompany)}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Cargo: </p>
                <p>{fullName(representativeCompany)}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Rubro de la empresa: </p>
                <p>{company?.category || "-"}</p>
              </div>
            </Col>
          </Row>
        </div>
        <div className="card-item">
          <Row gutter={[13, 13]}>
            <Col span={24}>
              <Title level={5} style={{ margin: "1px 0" }}>
                DATOS DE LAS PRÁCTICAS PRE PROFESIONALES:
              </Title>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Período de la Práctica y Evaluación: </p>
                <p>
                  {dayjs(practice?.startDate, "D/MM/YY").format("D MMMM YYYY")}{" "}
                  - {dayjs(practice?.endDate, "D/MM/YY").format("D MMMM YYYY")}
                </p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Horario: </p>
                <p>
                  {dayjs(practice?.entryTime, "HH:mm:ss").format("HH:mm a")} -
                  {dayjs(practice?.departureTime, "HH:mm:ss").format("HH:mm a")}
                </p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Total de horas de las Prácticas: </p>
                <p>{practice?.hours || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Dpto. Sector o Área de las Prácticas: </p>
                <p>{PracticeArea?.[practice?.practiceArea]?.name || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Funciones y/o Tareas asignadas de acuerdo al Módulo: </p>
                <p>{practice?.task || "-"}</p>
              </div>
            </Col>
            <Col span={24} md={8}>
              <div className="item">
                <p>Supervisor de prácticas asignado por el IESTP: </p>
                <p className="capitalize">{fullName(supervisor) || "-"}</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </DataEntryModal>
  );
};

const Container = styled.div`
  width: 100%;

  .card-item {
    padding: 1em 1.7em;
    background: #f2f9ffff;
    border-radius: 1em;
    margin-bottom: 1em;

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
  }
`;
