import React from "react";
import styled from "styled-components";
import {
  faBuilding,
  faUser,
  faLock,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Title } from "../../components";
import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useAuthentication, useGlobalData } from "../../providers";
import { fullName } from "../../utils";

export const HomeIntegration = () => {
  const { authUser } = useAuthentication();
  const { practices } = useGlobalData();

  const practicesOfUser = practices.filter(
    (practice) => practice.practitionerId === authUser.id
  );

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
                <FontAwesomeIcon icon={faUser} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>
                  <span className="capitalize"> {fullName(authUser)}:</span>
                </Title>
                <ul className="list">
                  <li>
                    <Link to="/profile">1. Perfil</Link>
                  </li>
                  <li>
                    2. Mis practicas
                    <ul className="list">
                      {practicesOfUser.map((practice) => (
                        <li key={practice.id} className="capitalize">
                          <Link to={`/practices/${practice.id}`}>
                            Modulo {practice.moduleNumber} : {practice.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </CardStyled>
            <CardStyled>
              <div className="icon">
                <FontAwesomeIcon icon={faUserGraduate} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>Practicantes:</Title>
                <ul className="list">
                  <li>
                    <Link to="/users?roleCode=user">
                      1. Lista de practicantes
                    </Link>
                  </li>{" "}
                </ul>
              </div>
            </CardStyled>
            <CardStyled>
              <div className="icon">
                <FontAwesomeIcon icon={faBuilding} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>Empresas:</Title>
                <ul className="list">
                  <li>
                    <Link to="/companies">1. Lista de empresas</Link>
                  </li>
                </ul>
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

  .capitalize {
    text-transform: capitalize;
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
