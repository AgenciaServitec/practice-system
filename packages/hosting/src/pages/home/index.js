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
import { notification, Text, Title, Button } from "../../components";
import { Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";
import { useAuthentication, useGlobalData } from "../../providers";
import { fullName } from "../../utils";
import { isEmpty, orderBy } from "lodash";
import { mediaQuery } from "../../styles";
import { useNavigate } from "react-router";

export const HomeIntegration = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { practices, users } = useGlobalData();

  const practicesOfUser = practices.filter(
    (practice) => practice.practitionerId === authUser.id
  );

  const isUser = authUser.roleCode === "user";
  const isCompanyRepresentative =
    authUser.roleCode === "company_representative";
  const isSupervisor = authUser.roleCode === "academic_supervisor";
  const isCoordinator = authUser.roleCode === "academic_coordinator";

  const isExistThreeModules = practicesOfUser.length === 3;

  const isCompleteDocumentation = !isEmpty(
    authUser.backDniPhoto && authUser.frontDniPhoto && authUser.signaturePhoto
  );
  console.log("Existe la documentacion", isCompleteDocumentation);

  const validateToCreatePractice = () => {
    notification({
      type: "warning",
      title: "Falta registrar DNI y Firma",
      description:
        "Por favor, para continuar debe subir los Documento requeridos (DNI y Firma). Para ello ingrese a su Perfil",
      btn: (
        <Button
          size="small"
          type="primary"
          onClick={() => navigate("/profile")}
        >
          Click aqui!
        </Button>
      ),
      duration: 3,
    });
  };

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
                    <span className="capitalize">Mis prácticas</span>
                  </Title>
                  <ul className="list">
                    <li>
                      {!isExistThreeModules ? (
                        isCompleteDocumentation ? (
                          <Link to="/practices/new">1. Crear práctica</Link>
                        ) : (
                          <a
                            rel="noreferrer"
                            onClick={() => validateToCreatePractice()}
                          >
                            1. Crear práctica
                          </a>
                        )
                      ) : (
                        <span style={{ color: "gray" }}>
                          1. Ya has completado tus 3 módulos
                        </span>
                      )}
                    </li>
                    <li>
                      <Link to="/practices">
                        2. Ver toda la lista de mis prácticas
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
                                <span>:</span>{" "}
                                <div className="name-practice">
                                  {practice.name}
                                </div>
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
                  <Title level={3}>Prácticas</Title>
                  <ul className="list">
                    <li>
                      <Link to="/practices">1. Lista de prácticas</Link>
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
  flex-wrap: wrap;
  align-items: center;
  gap: 3em;
  justify-content: center;
  ${mediaQuery.minTablet} {
    justify-content: start;
    flex-wrap: nowrap;
  }

  .icon {
    padding-left: 0;
    font-size: 0.8em;
    ${mediaQuery.minDesktop} {
      padding-left: 3em;
      font-size: 1em;
    }
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
          align-items: center;
          li {
            .item-module {
              display: flex;
              align-items: center;
              gap: 0.3em;
              .name-practice {
                font-size: 0.8em;
              }
            }
          }
        }
      }
    }
  }
`;
