import React, { useMemo } from "react";
import Title from "antd/es/typography/Title";
import {
  Button,
  Card,
  Carousel,
  Form,
  Input,
  InputPassword,
} from "../../components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import styled from "styled-components";
import { useAuthentication } from "../../providers";
import { mediaQuery } from "../../styles";
import { Bg1, Bg2, Bg3, Bg4, Bg5, Bg6, LogoPrimary } from "../../images";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const ImagesCarousel = [Bg1, Bg2, Bg3, Bg4, Bg5, Bg6];

export const LoginIntegration = () => {
  const navigate = useNavigate();
  const { authUser, loginLoading, loginWithEmailAndPassword } =
    useAuthentication();

  const onNavigateToHomePage = () => navigate("/home");

  useMemo(() => {
    authUser && navigate(authUser?.role?.initialPathname || "/home");
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
      <Carousel images={ImagesCarousel} />
      <CardStyled>
        <div className="logo" style={{ display: "grid", placeItems: "center" }}>
          <img
            onClick={onNavigateToHomePage}
            src={LogoPrimary}
            alt="Practice system logo"
          />
          <Title align="center" level={5} style={{ margin: "0" }}>
            Gilda Liliana Ballivián Rosado
          </Title>
        </div>
        <Title align="center" level={2}>
          Sistema de Prácticas
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
            INGRESAR
          </Button>
          <span>
            ¿No tienes una cuenta? <Link to="/register">Registrarme</Link>
          </span>
          {/*<span>*/}
          {/*  ¿Olvidaste tu contraseña?{" "}*/}
          {/*  <Link to="/recovery">Recupérala aquí</Link>*/}
          {/*</span>*/}
        </Form>
      </CardStyled>
    </Container>
  );
};

const Container = styled.div`
  height: auto;
  position: relative;
`;

const CardStyled = styled(Card)`
  width: 90%;
  position: absolute;
  margin: auto;
  top: 10%;
  right: 5%;

  ${mediaQuery.minMobile} {
    width: 450px;
    margin: 70px;
    top: 15%;
    right: 3%;
  }

  img {
    width: 9em;
    height: auto;
    object-fit: contain;
    cursor: pointer;
  }
`;
