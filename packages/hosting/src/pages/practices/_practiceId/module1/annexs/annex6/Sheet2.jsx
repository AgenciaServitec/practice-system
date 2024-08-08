import React from "react";
import styled from "styled-components";
import { modalConfirm, notification } from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
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
  return (
    <Container>
        <Row gutter={[16, 16]}>
          <Col span={24}>
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
