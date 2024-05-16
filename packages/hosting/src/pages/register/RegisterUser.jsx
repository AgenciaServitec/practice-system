import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  InputNumber,
  InputPassword,
  notification,
} from "../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../hooks";
import * as yup from "yup";
import { useAuthentication } from "../../providers";

export const RegisterUser = () => {
  const { authUser } = useAuthentication();
  const { assignCreateProps } = useDefaultFirestoreProps();

  const schema = yup.object({
    dni: yup.number().required(),
    names: yup.string().required(),
    paternalSurname: yup.string().required(),
    maternalSurname: yup.string().required(),
    phoneNumber: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const mapUser = (formData) => ({
    dni: formData.dni,
    names: formData.names,
    paternalSurname: formData.paternalSurname,
    maternalSurname: formData.maternalSurname,
    phoneNumber: formData.phoneNumber,
  });

  const onSubmitRegisterUser = async (formData) => {
    try {
      console.log(formData);
    } catch (e) {
      console.error("Error registerPersonalData: ", e);
      notification({ type: "error" });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitRegisterUser)}>
      <Controller
        name="dni"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <InputNumber
            label="DNI"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
          />
        )}
      />
      <Controller
        name="names"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Nombres"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
          />
        )}
      />
      <Controller
        name="paternalSurname"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Apellido Paterno"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
          />
        )}
      />
      <Controller
        name="maternalSurname"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Apellido Materno"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
          />
        )}
      />
      <Controller
        name="phoneNumber"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Ingrese teléfono"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
          />
        )}
      />
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
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <InputPassword
            label="Contraseña"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
          />
        )}
      />
      <Button block size="large" type="primary" htmlType="submit">
        Registrarme
      </Button>
    </Form>
  );
};
