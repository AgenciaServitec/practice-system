import React from "react";
import styled from "styled-components";
import {
  Button,
  modalConfirm,
  Form,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { BusinessPosition } from "../../../../../../data-list";
import { Alert } from "antd";

export const Sheet2Integration = ({
  company,
  representativeCompany,
  supervisor,
  practice,
}) => {
  const onConfirmSheet2 = () =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: () => notification({ type: "success" }),
    });

  return (
    <Sheet2
      onConfirmSheet2={onConfirmSheet2}
      company={company}
      representativeCompany={representativeCompany}
      supervisor={supervisor}
      practice={practice}
    />
  );
};

const Sheet2 = ({
  onConfirmSheet2,
  company,
  representativeCompany,
  supervisor,
  practice,
}) => {
  const BusinessPositionValue = BusinessPosition.find(
    (position) =>
      position.value ===
      representativeCompany?.companyRepresentativeData?.businessPosition
  )?.label;

  return (
    <Container>
      <Form>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={5}>II. INFORMACIÓN GENERAL SOBRE LA EMPRESA:</Title>
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
              onClick={() => onConfirmSheet2()}
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
