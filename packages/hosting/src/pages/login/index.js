import React, { useMemo } from "react";
import Title from "antd/es/typography/Title";
import { Button, Form, Input, InputPassword } from "../../components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import styled from "styled-components";
import { useAuthentication } from "../../providers";
import { Card, Layout } from "antd";
import { mediaQuery } from "../../styles";
import { LogoPrimary } from "../../images";
import { useNavigate } from "react-router";

export const LoginIntegration = () => {
  const navigate = useNavigate();
  const { authUser, loginLoading, loginWithEmailAndPassword } =
    useAuthentication();

  const onNavigateToHomePage = () => navigate("/home");

  useMemo(() => {
    authUser && onNavigateToHomePage();
  }, [authUser]);

  const onSubmit = async ({ email, password }) =>
    loginWithEmailAndPassword(email, password);

  return (
    <Login
      loading={loginLoading}
      onSubmit={onSubmit}
      onNavigateToHomePage={onNavigateToHomePage}
    />
  );
};

const Login = ({ loading, onSubmit, onNavigateToHomePage }) => {
  const schema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  return (
    <Container>
      <CardStyled>
        <div className="logo" style={{ display: "grid", placeItems: "center" }}>
          <img
            onClick={onNavigateToHomePage}
            src={LogoPrimary}
            alt="Practice system logo"
          />
        </div>
        <Title align="center" level={2}>
          Practice system
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Email"
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
              />
            )}
          />
          <Controller
            name="password"
            defaultValue=""
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <InputPassword
                label="Password"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
              />
            )}
          />
          <Button
            loading={loading}
            type="primary"
            size="large"
            block
            htmlType="submit"
          >
            LOGIN
          </Button>
        </Form>
      </CardStyled>
    </Container>
  );
};

const Container = styled(Layout)`
  height: 100vh;
  background: linear-gradient(to bottom, #006ae5, #363a45);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardStyled = styled(Card)`
  width: 90%;

  ${mediaQuery.minMobile} {
    width: 450px;
    padding: 1rem;
  }

  img {
    width: 3.5em;
    height: auto;
    object-fit: contain;
    cursor: pointer;
  }
`;
