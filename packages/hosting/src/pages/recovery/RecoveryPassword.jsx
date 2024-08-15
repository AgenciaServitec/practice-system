import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Row,
  Title,
} from "../../components";
import { Controller, useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import Col from "antd/lib/col";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { useFormUtils } from "../../hooks";
import * as yup from "yup";
import { fetchUserByEmail, updateUser } from "../../firebase/collections";
import { auth } from "../../firebase";

export const RecoveryPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object({
    email: yup.string().email().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const searchUserForEmail = async (formData) => {
    try {
      const existsUser = await fetchUserByEmail(formData.email);
      if (!existsUser)
        return notification({
          type: "warning",
          title: "El correo ingresado no está registrado",
        });

      await auth.sendPasswordResetEmail(formData.email);

      notification({
        type: "success",
        title:
          "Correo de recuperacion enviado exitosamente, revise su bandeja!",
      });
    } catch (e) {
      console.log("PasswordRecovery: ", e);
      notification({
        type: "error",
      });
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(searchUserForEmail)}>
        <Col className="title-login" span={24}>
          <FontAwesomeIcon icon={faCircleUser} size="6x" />
          &nbsp;
        </Col>
        <Col>
          <Title level={3} className="subtitle-recovery" align="center">
            Buscar tu cuenta
          </Title>
          <br />
          <span className="subtitle-recovery">
            Ingresa tu correo electrónico para buscar tu cuenta.
          </span>
        </Col>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <Input
              label="Email"
              onChange={onChange}
              value={value}
              name={name}
              error={error(name)}
              helperText={errorMessage(name)}
              required={required(name)}
            />
          )}
        />
        <Row gutter={[16, 16]} justify="center">
          <Col span={24}>
            <Button block type="primary" size="large" htmlType="submit">
              Buscar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  .subtitle-recovery {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
