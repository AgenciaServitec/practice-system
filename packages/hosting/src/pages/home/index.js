import React from "react";
import styled from "styled-components";
import {
  faBuilding,
  faFolder,
  faFolderTree,
  faLock,
  faUser,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Text, Title } from "../../components";
import { Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";
import { useAuthentication, useGlobalData } from "../../providers";
import { fullName } from "../../utils";
import { orderBy } from "lodash";

export const HomeIntegration = () => {
  const { authUser } = useAuthentication();
  const { practices } = useGlobalData();

  const practicesOfUser = practices.filter(
    (practice) => practice.practitionerId === authUser.id
  );

  const isUser = authUser.roleCode === "user";
  const isCompanyRepresentative =
    authUser.roleCode === "company_representative";
  const isSupervisor = authUser.roleCode === "academic_supervisor";
  const isCoordinator = authUser.roleCode === "academic_coordinator";

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
                  <span className="capitalize"> {fullName(authUser)}</span>
                </Title>
                <ul className="list">
                  <li>
                    <Link to="/profile">1. Perfil</Link>
                  </li>
                </ul>
              </div>
            </CardStyled>
            {isUser && (
              <CardStyled>
                <div className="icon">
                  <FontAwesomeIcon icon={faFolder} size="5x" />
                </div>
                <div className="texts">
                  <Title level={3}>
                    <span className="capitalize">Mis practicas</span>
                  </Title>
                  <ul className="list">
                    <li>
                      <Link to="/practices">
                        1. Ver toda la lista de mis practicas
                      </Link>
                    </li>
                    <li className="my-practices">
                      <ul className="list">
                        {orderBy(practicesOfUser, "moduleNumber", "asc").map(
                          (practice) => (
                            <li key={practice.id} className="capitalize">
                              <Link
                                to={`/practices/${practice.id}`}
                                className="item-module"
                              >
                                <div>
                                  <Tag color="blue" style={{ margin: "0" }}>
                                    <FontAwesomeIcon icon={faFolder} /> &nbsp;
                                    Modulo
                                    {practice.moduleNumber}
                                  </Tag>
                                </div>
                                <span>:</span> <div>{practice.name}</div>
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </li>
                  </ul>
                </div>
              </CardStyled>
            )}
            {!isUser && (
              <CardStyled>
                <div className="icon">
                  <FontAwesomeIcon icon={faFolderTree} size="4x" />
                </div>
                <div className="texts">
                  <Title level={3}>Practicas</Title>
                  <ul className="list">
                    <li>
                      <Link to="/practices">1. Lista de practicas</Link>
                    </li>
                  </ul>
                </div>
              </CardStyled>
            )}
            {!isUser && (
              <CardStyled>
                <div className="icon">
                  <FontAwesomeIcon icon={faUserGraduate} size="5x" />
                </div>
                <div className="texts">
                  <Title level={3}>Practicantes</Title>
                  <ul className="list">
                    <li>
                      <Link to="/users?roleCode=user">
                        1. Lista de practicantes
                      </Link>
                    </li>{" "}
                  </ul>
                </div>
              </CardStyled>
            )}
            <CardStyled>
              <div className="icon">
                <FontAwesomeIcon icon={faBuilding} size="5x" />
              </div>
              <div className="texts">
                <Title level={3}>Empresas</Title>
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
  min-height: 11em;
  height: auto;
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
      gap: 0.5em;

      .my-practices {
        margin-top: 0.7em;
        .list {
          display: grid;
          gap: 0.7em;
          li {
            .item-module {
              display: flex;
              gap: 0.3em;
            }
          }
        }
      }
    }
  }
`;
