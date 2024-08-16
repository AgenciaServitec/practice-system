import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../providers";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { IconAction, Title } from "../../components";
import { Link } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";
import { RegisterRepresentativeCompanyIntegration } from "./RegisterRepresentativeCompany";
import { RegisterAcademicSupervisorIntegration } from "./RegisterAcademicSupervisor";
import { useQueryString } from "../../hooks";
import { isEmpty } from "lodash";
import { UserTypeSelected } from "./UserTypeSelected";
import { Roles } from "../../data-list";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { mediaQuery } from "../../styles";

export const RegisterIntegration = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const [roleCode, setRoleCode] = useQueryString("roleCode", null);

  const onNavigateTo = (url) => navigate(url);

  useEffect(() => {
    authUser && onNavigateTo("/home");
  }, [authUser]);

  const userRole = Roles.find((role) => role.code === roleCode);

  console.log({ roleCode });

  if (isEmpty(roleCode))
    return (
      <UserTypeSelected
        onSetRoleCode={setRoleCode}
        onNavigateTo={onNavigateTo}
      />
    );

  return (
    <Container>
      <div className="content-wrapper">
        <Row gutter={[16, 16]}>
          <Col span={3}>
            <IconAction
              icon={faArrowLeft}
              styled={{ color: (theme) => theme.colors.primary }}
              onClick={() => {
                setRoleCode(null);
                onNavigateTo("/register");
              }}
            />
          </Col>
          <Col span={18} className="title-login">
            <Title level={3} align="center">
              Registro de {userRole?.name || ""}
            </Title>
          </Col>
          <Col span={3}></Col>
          <Col span={24}>
            {roleCode === "user" ? (
              <RegisterUser roleCode={roleCode} />
            ) : roleCode === "company_representative" ? (
              <RegisterRepresentativeCompanyIntegration roleCode={roleCode} />
            ) : roleCode === "academic_supervisor" ? (
              <RegisterAcademicSupervisorIntegration roleCode={roleCode} />
            ) : (
              <RegisterUser roleCode={roleCode} />
            )}
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]} justify="space-between">
          <Col span={24} md={12}>
            <span>
              ¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link>
            </span>
          </Col>
          <Col
            span={24}
            md={12}
            style={{ display: "flex", justifyContent: "end" }}
          >
            <span
              className="link-color"
              onClick={() => {
                setRoleCode(null);
                onNavigateTo("/register");
              }}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> &nbsp; Retroceder
            </span>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  height: auto;
  display: flex;
  justify-content: center;

  .content-wrapper {
    height: auto;
    padding: 1.7rem;
    border-radius: 0;
    background: ${({ theme }) => theme.colors.white};
    margin: 0 auto;
    ${mediaQuery.minTablet} {
      margin: 1em auto;
      border-radius: 1em;
    }
  }

  .title-login {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
