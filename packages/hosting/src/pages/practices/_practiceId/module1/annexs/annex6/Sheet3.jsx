import React from "react";
import {
  Button,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import styled from "styled-components";
import moment from "moment/moment";

export const Sheet3Integration = ({ practice }) => {
  const onConfirmSheet3 = () =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: () => notification({ type: "success" }),
    });

  return <Sheet3 onConfirmSheet3={onConfirmSheet3} practice={practice} />;
};

const Sheet3 = ({ onConfirmSheet3, practice }) => {
  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>III. DATOS DE LA PRACTICA PRE-PROFESIONAL:</Title>
        </Col>
        <Col span={24} md={12}>
          <label>Módulo del Plan Curricular Vinculado:</label>
          <p>{`Nº ${practice.moduleNumber} ${practice.name}` || "-"}</p>
        </Col>
        <Col span={24} md={12}>
          <label>Funciones y/o Tareas asignadas de acuerdo al Módulo:</label>
          <p>{practice.task || "-"}</p>
        </Col>
        <Col span={24} md={6}>
          <label>Total de Horas Acumuladas:</label>
          <p>{practice.hours || "-"}</p>
        </Col>
        <Col span={24} md={9}>
          <label>Período de Ejecución de las Prácticas:</label>
          <p>
            {`${moment(practice.startDate, "DD/MM/YYYY").format(
              "DD/MM/YYYY"
            )} - ${moment(practice.endDate, "DD/MM/YYYY").format(
              "DD/MM/YYYY"
            )}` || "-"}
          </p>
        </Col>
        <Col span={24} md={9}>
          <label>Horario de Prácticas:</label>
          <p>{`${practice.entryTime} - ${practice.departureTime}` || "-"}</p>
        </Col>
        <Col span={24} md={6}>
          <label>Lugar de Prácticas:</label>
          <p>{practice.practiceArea || "-"}</p>
        </Col>
        <Col span={24} md={10}>
          <label>
            Aspectos Desarrollados referente al Módulo del Plan Curricular
            vinculado:
          </label>
          <p>{practice.task || "-"}</p>
        </Col>
      </Row>
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24} sm={6} md={4}>
          <Button
            type="primary"
            danger
            size="large"
            block
            onClick={() => onConfirmSheet3()}
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
