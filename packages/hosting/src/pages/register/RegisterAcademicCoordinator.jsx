import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  InputPassword,
  notification,
} from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useAuthentication } from "../../providers";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiPersonDataByDniGet,
  useApiUserPost,
} from "../../api";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormUtils } from "../../hooks";
import { capitalize } from "lodash";

export const RegisterAcademicCoordinatorIntegration = ({ roleCode }) => {
  const { loginWithEmailAndPassword } = useAuthentication();
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const {
    getPersonDataByDni,
    getPersonDataByDniResponse,
    getPersonDataByDniLoading,
  } = useApiPersonDataByDniGet();
  const [loadingRegister, setLoadingRegister] = useState(false);

  const mapUser = (formData) => ({
    roleCode: roleCode,
    dni: formData.dni,
    firstName: formData.firstName,
    paternalSurname: formData.paternalSurname,
    maternalSurname: formData.maternalSurname,
    phone: {
      prefix: "+51",
      number: formData.phoneNumber,
    },
    email: formData.email.toLowerCase(),
    password: formData.password,
  });

  const onSaveUser = async (formData) => {
    try {
      setLoadingRegister(true);

      const response = await postUser(mapUser(formData));
      if (!postUserResponse.ok) {
        throw new Error(response);
      }

      notification({
        type: "success",
        title: "¡El usuario se guardó correctamente!",
      });

      loginWithEmailAndPassword(formData.email, formData.password);
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <RegisterAcademicCoordinator
      onGetPersonDataByDni={getPersonDataByDni}
      onGetPersonDataByDniResponse={getPersonDataByDniResponse}
      onGetPersonDataByDniLoading={getPersonDataByDniLoading}
      loadingRegister={loadingRegister}
      postUserLoading={postUserLoading}
      onSaveUser={onSaveUser}
    />
  );
};

const RegisterAcademicCoordinator = ({
  onGetPersonDataByDni,
  onGetPersonDataByDniResponse,
  onGetPersonDataByDniLoading,
  loadingRegister,
  postUserLoading,
  onSaveUser,
}) => {
  const schema = yup.object({
    dni: yup.string().min(8).max(8).required(),
    firstName: yup.string().required(),
    paternalSurname: yup.string().required(),
    maternalSurname: yup.string().required(),
    phoneNumber: yup.string().min(9).max(9).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const userResetFields = (user) => {
    setValue("firstName", capitalize(user?.firstName || ""));
    setValue("paternalSurname", capitalize(user?.paternalSurname || ""));
    setValue("maternalSurname", capitalize(user?.maternalSurname || ""));
  };

  useEffect(() => {
    const existsDni = (watch("dni") || "").length === 8;
    if (existsDni) {
      (async () => {
        try {
          const response = await onGetPersonDataByDni(watch("dni"));
          if (!onGetPersonDataByDniResponse.ok) {
            throw new Error(response);
          }

          userResetFields(response);
        } catch (e) {
          const errorResponse = await getApiErrorResponse(e);
          apiErrorNotification(errorResponse);
          userResetFields(null);
        }
      })();
    } else {
      userResetFields(null);
    }
  }, [watch("dni")]);

  const onSubmit = async (formData) => await onSaveUser(formData);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="dni"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="DNI"
            type="number"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
            suffix={
              onGetPersonDataByDniLoading && (
                <FontAwesomeIcon icon={faSpinner} spin />
              )
            }
          />
        )}
      />
      <Controller
        name="firstName"
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
      <Button
        block
        size="large"
        type="primary"
        htmlType="submit"
        loading={loadingRegister || postUserLoading}
      >
        Registrarme
      </Button>
    </Form>
  );
};
