import React from "react";
import {
  Button,
  Form,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import styled from "styled-components";
import { Alert } from "antd";

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
      <Form>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={5}>
              III. INFORMACIÓN GENERAL SOBRE LAS PRÁCTICAS:
            </Title>
            <Alert
              type="info"
              showIcon
              message={
                <>
                  Antes de aprobar, revisa el anexo haciendo{" "}
                  <a href={`/practices/${practice.id}/module1/sheets#annex6`}>
                    Click Aquí!
                  </a>
                </>
              }
            />
          </Col>
        </Row>
        <Row justify="center" gutter={[16, 16]}>
          <Col>
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
