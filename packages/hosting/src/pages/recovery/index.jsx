import React from "react";
import styled from "styled-components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { IconAction } from "../../components";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { RecoveryPassword } from "./RecoveryPassword";

export const RecoveryIntegration = () => {
  const navigate = useNavigate();

  const onNavigateTo = (url) => navigate(url);

  return (
    <Container>
      <div className="content-wrapper">
        <Row gutter={[16, 16]}>
          <Col span={3}>
            <IconAction
              icon={faArrowLeft}
              styled={{ color: (theme) => theme.colors.primary }}
              onClick={() => {
                onNavigateTo("/");
              }}
            />
          </Col>
          <Col span={24}>
            <RecoveryPassword />
          </Col>
        </Row>
        <br />
        <Row gutter={[16, 16]} justify="space-between">
          <Col span={24} md={12}>
            <span>
              ¿Ya tienes una cuenta? <Link to="/">Iniciar sesión</Link>
            </span>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  .content-wrapper {
    width: 50em;
    padding: 1.7rem;
    border-radius: 2em;
    background: ${({ theme }) => theme.colors.white};
    margin: 0 auto;
  }

  .title-login {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
