import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../providers";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { RadioGroup, Title } from "../../components";
import { Link } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";
import { RegisterRepresentativeCompanyIntegration } from "./RegisterRepresentativeCompany";
import { RegisterAcademicSupervisorIntegration } from "./RegisterAcademicSupervisor";
import { RegisterAcademicCoordinatorIntegration } from "./RegisterAcademicCoordinator";

export const RegisterIntegration = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const [roleCode, setRoleCode] = useState("user");

  const onNavigateTo = (url) => navigate(url);

  useEffect(() => {
    authUser && onNavigateTo("/home");
  }, [authUser]);

  return (
    <Container>
      <div className="content-wrapper">
        <div className="content-step-wrapper">
          <Row gutter={[16, 16]}>
            <Col span={24} className="title-login">
              <Title level={3}>Registro</Title>
            </Col>
            <Col span={24}>
              <RadioGroup
                label="Tipo de Usuario"
                value={roleCode}
                options={[
                  {
                    label: "Practicante",
                    value: "user",
                  },
                  {
                    label: "Representante de empresa",
                    value: "company_representative",
                  },
                  {
                    label: "Supervisor académico",
                    value: "academic_supervisor",
                  },
                  {
                    label: "Coordinador académico",
                    value: "academic_coordinator",
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) => setRoleCode(e.target.value)}
              />
            </Col>
            <Col span={24}>
              {roleCode === "user" ? (
                <RegisterUser roleCode={roleCode} />
              ) : roleCode === "company_representative" ? (
                <RegisterRepresentativeCompanyIntegration roleCode={roleCode} />
              ) : roleCode === "academic_supervisor" ? (
                <RegisterAcademicSupervisorIntegration roleCode={roleCode} />
              ) : (
                <RegisterAcademicCoordinatorIntegration roleCode={roleCode} />
              )}
            </Col>

            <Col span={24}>
              <span>
                ¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link>
              </span>
            </Col>
          </Row>
        </div>
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
    max-width: 50em;
    width: 100%;
    margin: 0 auto;
    padding: 3em 1em;
  }

  .content-step-wrapper {
    width: auto;
    height: auto;
    padding: 1.7rem;
    border-radius: 1em;
    background: ${({ theme }) => theme.colors.white};
  }

  .title-login {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};

    h3 {
      color: inherit;
    }
  }
`;
