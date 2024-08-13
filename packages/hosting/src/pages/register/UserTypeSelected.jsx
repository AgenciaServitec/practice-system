import React from "react";
import { Button, Col, Row } from "../../components";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBuilding,
  faUserGear,
  faUserGraduate,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { mediaQuery } from "../../styles";

export const UserTypeSelected = ({ onSetRoleCode, onNavigateTo }) => {
  return (
    <Container>
      <div className="wrapper-card">
        <Row>
          <Col>
            <h2 className="center">¿QUÉ TIPO DE USUARIO ERES?</h2>
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => onSetRoleCode("user")}
            >
              <FontAwesomeIcon icon={faUserGraduate} size="1x" /> &nbsp;
              PRACTICANTE
            </Button>
          </Col>

          <Col span={24}>
            <Button
              size="large"
              block
              type="primary"
              onClick={() => onSetRoleCode("academic_supervisor")}
            >
              <FontAwesomeIcon icon={faUserTie} size="1x" /> &nbsp; SUPERVISOR
            </Button>
          </Col>

          <Col span={24}>
            <Button
              size="large"
              block
              type="primary"
              onClick={() => onSetRoleCode("company_representative")}
            >
              <FontAwesomeIcon icon={faBuilding} size="1x" /> &nbsp;
              REPRESENTANTE DE EMPRESA
            </Button>
          </Col>

          <Col span={24}>
            <Button
              size="large"
              block
              type="primary"
              onClick={() => onSetRoleCode("academic_coordinator")}
            >
              <FontAwesomeIcon icon={faUserGear} size="1x" /> &nbsp; COORDINADOR
            </Button>
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]} style={{ width: "100%" }}>
          <Col span={24}>
            <span
              className="link-color"
              style={{ display: "flex", justifyContent: "end" }}
              onClick={() => {
                onSetRoleCode(null);
                onNavigateTo("/");
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Iniciar Sesión
            </span>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #fff;
  ${mediaQuery.minTablet} {
    background-color: transparent;
  }
  .wrapper-card {
    background-color: #fff;
    border-radius: 1.7em;
    margin: 1em;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 570px;
    width: 100%;
  }
`;
