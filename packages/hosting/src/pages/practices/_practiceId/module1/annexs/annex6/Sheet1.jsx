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
import { Alert } from "antd";
import { Link } from "react-router-dom";

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
            <Title level={5}>
              I. INFORMACIÓN GENERAL SOBRE EL PRACTICANTE:
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
              onClick={() => onConfirmSheet1()}
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
