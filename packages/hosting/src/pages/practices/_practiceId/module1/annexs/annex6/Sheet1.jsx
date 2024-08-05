import React from "react";
import styled from "styled-components";
import {
  Button,
  Form,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useForm } from "react-hook-form";
import { ProfessionalCareer } from "../../../../../../data-list";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";

export const Sheet1Integration = ({ practice, practitioner }) => {
  const onConfirmSheet1 = () =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: () => notification({ type: "success" }),
    });

  return (
    <Sheet1
      onConfirmSheet1={onConfirmSheet1}
      practitioner={practitioner}
      practice={practice}
    />
  );
};

const Sheet1 = ({ onConfirmSheet1, practitioner, practice }) => {
  const ProfessionalCareerValue = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  )?.label;

  const schema = yup.object({
    socialReason: yup.string().required(),
    address: yup.string().required(),
  });

  const {
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Form>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={5}>I. DATOS GENERALES DEL PRACTICANTE:</Title>
          </Col>
          <Col span={24} md={7}>
            <div>
              <label>Apellidos y Nombres: </label>
              <p>
                {`${practitioner?.paternalSurname} ${practitioner?.maternalSurname} ${practitioner?.firstName}` ||
                  "-"}
              </p>
            </div>
          </Col>
          <Col span={24} md={7}>
            <div>
              <label>Carrera Profesional: </label>
              <p>{ProfessionalCareerValue || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={10}>
            <div>
              <label>
                Módulo (s) Técnico-Profesional(es) ejecutado del Plan
                Curricular:{" "}
              </label>
              <p>{practice?.name || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div>
              <label>
                Período de Estudios (Año de ingreso - Año de Egreso) :
              </label>
              <p>
                {practitioner?.practitionerData?.entryYear || "-"} -{" "}
                {practitioner?.practitionerData?.yearGraduation || "En curso"}
              </p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div>
              <label>Domicilio: </label>
              <p>{"-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div>
              <label>Teléfonos (Domicilio - Personal): </label>
              <p>{practitioner?.phoneNumber || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div>
              <label>Correo Electrónico: </label>
              <p>{practitioner?.email || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div>
              <label>DNI: </label>
              <p>{practitioner?.dni || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div>
              <label>Código de Matrícula: </label>
              <p>{practitioner?.practitionerData?.tuitionId || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={6}>
            <div>
              <label>Semestre: </label>
              <p>{practitioner?.practitionerData?.semester || "Egresado"}</p>
            </div>
          </Col>
          <Col span={24} md={6}>
            <div>
              <label>Turno: </label>
              <p>
                {practitioner?.practitionerData?.studentShift || "Egresado"}
              </p>
            </div>
          </Col>
          <Col span={24} md={6}>
            <div>
              <label>Período de Evaluación: </label>
              <p>
                {practice?.startDate
                  ? dayjs(practice.startDate, "DD/MM/YYYY").format("DD/MM/YYYY")
                  : "-"}{" "}
                -{" "}
                {practice?.endDate
                  ? dayjs(practice.endDate, "DD/MM/YYYY").format("DD/MM/YYYY")
                  : "-"}
              </p>
            </div>
          </Col>
          <Col span={24} md={6}>
            <div>
              <label>Total de Horas: </label>
              <p>{practice?.hours || "-"}</p>
            </div>
          </Col>
        </Row>
        <Row justify="end" gutter={[16, 16]}>
          <Col span={24} sm={6} md={4}>
            <Button
              type="primary"
              danger
              size="large"
              block
              onClick={() => onConfirmSheet1()}
            >
              Aprobar
            </Button>
          </Col>
          <Col span={24} sm={6} md={4}>
            <Button type="primary" size="large" block htmlType="submit">
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
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
