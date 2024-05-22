import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useAuthentication } from "../../providers";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { RadioGroup, Title } from "../../components";
import { Link } from "react-router-dom";
import { RegisterUser } from "./RegisterUser";
import { RegisterCompany } from "./RegisterCompany";

export const RegisterIntegration = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const [type, setType] = useState("person");

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
                value={type}
                options={[
                  {
                    label: "Persona",
                    value: "person",
                  },
                  {
                    label: "Empresa",
                    value: "company",
                  },
                ]}
                optionType="button"
                buttonStyle="solid"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
                onChange={(e) => setType(e.target.value)}
              />
            </Col>
            <Col span={24}>
              {type === "person" ? (
                <RegisterUser type={type} />
              ) : (
                <RegisterCompany type={type} />
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
    max-width: 40em;
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
