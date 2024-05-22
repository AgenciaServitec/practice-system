import React from "react";
import styled from "styled-components";
import {
  faClockRotateLeft,
  faFile,
  faLock,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Title } from "../../components";
import { Col, Row } from "antd";

export const HomeIntegration = () => {
  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3} align="center">
            BIENVENIDO(A) AL SISTEMA DE PRÁCTICAS PRE PROFESIONALES:
          </Title>
        </Col>
        <Col span={24}>
          <div className="cards-wrapper">
            <CardStyled>
              <div className="icon">
                <FontAwesomeIcon icon={faFile} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>BENEFICIOS:</Title>
                <ul className="list">
                  <li>1. Facilidad de Trámite</li>
                  <li>2. Acceso en cualquier dispositivo</li>
                  <li>3. Impresión y PDF</li>
                </ul>
              </div>
            </CardStyled>
            <CardStyled>
              <div className="icon">
                <FontAwesomeIcon icon={faQrcode} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>QR ÚNICO:</Title>
                <Text>
                  Cada trámite cuenta con un QR único, para evitar documentos
                  falsos
                </Text>
              </div>
            </CardStyled>
            <CardStyled>
              <div className="icon">
                <FontAwesomeIcon icon={faClockRotateLeft} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>TIEMPO:</Title>
                <Text>
                  Tus trámites de manera virtual, evitando horas de hacer fila
                </Text>
              </div>
            </CardStyled>
            <CardStyled>
              <div className="icon">
                <FontAwesomeIcon icon={faLock} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>SEGURIDAD:</Title>
                <Text>
                  Tu información académica 100% segura en nuestra base de datos
                </Text>
              </div>
            </CardStyled>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  .centered {
    display: flex;
    justify-content: center;
  }

  .cards-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 1em;
    justify-content: center;
  }
`;

const CardStyled = styled.div`
  background: #aadbff;
  padding: 1em;
  border-radius: 1em;
  width: 45em;
  height: 11em;
  display: flex;
  align-items: center;
  gap: 3em;

  .icon {
    padding-left: 3em;
  }

  .texts {
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 0.2em;
    }
  }
`;
