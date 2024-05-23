import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  ComponentContainer,
  Form,
  Input,
  InputPassword,
  notification,
  Select,
} from "../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import * as yup from "yup";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiCompanyDataByRucGet,
  useApiPersonDataByDniGet,
  useApiUserPost,
} from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "lodash";
import { useAuthentication } from "../../providers";
import { Space } from "antd";
import { BusinessPosition } from "../../data-list";

export const RegisterRepresentativeCompanyIntegration = ({ roleCode }) => {
  const { loginWithEmailAndPassword } = useAuthentication();
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const {
    getPersonDataByDni,
    getPersonDataByDniResponse,
    getPersonDataByDniLoading,
  } = useApiPersonDataByDniGet();
  const {
    getCompanyDataByRuc,
    getCompanyDataByRucResponse,
    getCompanyDataByRucLoading,
  } = useApiCompanyDataByRucGet();

  const [company, setCompany] = useState(null);
  const [loadingRegister, setLoadingRegister] = useState(false);

  const mapUser = (formData) => ({
    roleCode: roleCode, //company_representative
    dni: formData.dni,
    firstName: formData.firstName.toLowerCase(),
    paternalSurname: formData.paternalSurname.toLowerCase(),
    maternalSurname: formData.maternalSurname.toLowerCase(),
    phone: {
      prefix: "+51",
      number: formData.phoneNumber,
    },
    email: formData.email.toLowerCase(),
    password: formData.password,
    companyRepresentative: {
      ruc: company.ruc,
      businessPosition: formData?.businessPosition,
    },
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
    <RegisterCompanyRepresentative
      onGetPersonDataByDni={getPersonDataByDni}
      onGetPersonDataByDniResponse={getPersonDataByDniResponse}
      onGetPersonDataByDniLoading={getPersonDataByDniLoading}
      onGetCompanyDataByRuc={getCompanyDataByRuc}
      onGetCompanyDataByRucResponse={getCompanyDataByRucResponse}
      onGetCompanyDataByRucLoading={getCompanyDataByRucLoading}
      company={company}
      onSetCompany={setCompany}
      loadingRegister={loadingRegister}
      postUserLoading={postUserLoading}
      onSaveUser={onSaveUser}
    />
  );
};

const RegisterCompanyRepresentative = ({
  onGetPersonDataByDni,
  onGetPersonDataByDniResponse,
  onGetPersonDataByDniLoading,
  onGetCompanyDataByRuc,
  onGetCompanyDataByRucResponse,
  onGetCompanyDataByRucLoading,
  company,
  onSetCompany,
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
    companyRuc: yup.string().min(11).max(11).required(),
    businessPosition: yup.string().required(),
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
    const existsRuc = (watch("companyRuc") || "").length === 11;
    if (existsRuc) {
      (async () => {
        try {
          const response = await onGetCompanyDataByRuc(watch("companyRuc"));
          if (!onGetCompanyDataByRucResponse.ok) {
            throw new Error(response);
          }

          onSetCompany(response);
        } catch (e) {
          const errorResponse = await getApiErrorResponse(e);
          apiErrorNotification(errorResponse);
          onSetCompany(null);
          setValue("companyRuc", "");
        }
      })();
    }
  }, [watch("companyRuc")]);

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
      <Controller
        name="companyRuc"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="RUC de empresa"
            type="number"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
            suffix={
              onGetCompanyDataByRucLoading && (
                <FontAwesomeIcon icon={faSpinner} spin />
              )
            }
          />
        )}
      />
      {company && watch("companyRuc").length === 11 && (
        <>
          <ComponentContainer.group label="Empresa">
            <Space
              wrap
              style={{ display: "flex", justifyContent: "start", gap: "1.5em" }}
            >
              <span>
                Razón social: <h5>{company.socialReason}</h5>
              </span>
              <span>
                RUC:
                <h5>{company.ruc}</h5>
              </span>
            </Space>
          </ComponentContainer.group>
          <Controller
            name="businessPosition"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Select
                label="Cargo en la empresa"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
                options={BusinessPosition}
              />
            )}
          />
        </>
      )}
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
