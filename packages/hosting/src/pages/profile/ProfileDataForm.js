import React, { useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { useFormUtils } from "../../hooks";
import {
  Button,
  Form,
  Input,
  notification,
  Select,
  Upload,
} from "../../components";
import { useAuthentication, useGlobalData } from "../../providers";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiUserPut,
} from "../../api";
import { assign } from "lodash";
import { v4 as uuidv4 } from "uuid";

export const ProfileDataForm = () => {
  const { authUser } = useAuthentication();
  const { putUser, putUserLoading, putUserResponse } = useApiUserPut();
  const { companies, users } = useGlobalData();

  const companiesView = companies.map((company) => ({
    label: company.socialReason,
    value: company.id,
  }));

  const coordinatorView = users
    .filter((user) => user.roleCode === "academic_coordinator")
    .map((_user) => ({
      label: `${_user.firstName} ${_user.paternalSurname} ${_user.maternalSurname}`,
      value: _user.id,
    }));

  const supervisorView = users
    .filter((user) => user.roleCode === "academic_supervisor")
    .map((_user) => ({
      label: `${_user.firstName} ${_user.paternalSurname} ${_user.maternalSurname}`,
      value: _user.id,
    }));

  const schema = yup.object({
    profilePhoto: yup.mixed(),
    firstName: yup.string().required(),
    paternalSurname: yup.string().required(),
    maternalSurname: yup.string().required(),
    email: yup.string().email().required(),
    phoneNumber: yup.string().min(9).max(9).required(),
    dni: yup
      .string()
      .min(8)
      .max(8)
      .required()
      .transform((value) => (value === null ? "" : value)),
    companiesIds: yup.array().when("authUser", {
      is: () => authUser.roleCode === "user",
      then: yup.array().required(),
      otherwise: yup.array(),
    }),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { error, errorMessage, required } = useFormUtils({ errors, schema });

  const updateProfile = async (formData) => {
    try {
      const response = await putUser(
        assign({}, formData, {
          id: authUser.id,
          phone: { prefix: "+51", number: formData.phoneNumber },
        })
      );

      if (!putUserResponse.ok) {
        throw new Error(response);
      }

      notification({ type: "success" });
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };

  const resetForm = () => {
    reset({
      profilePhoto: authUser?.profilePhoto || null,
      firstName: authUser?.firstName || "",
      maternalSurname: authUser?.maternalSurname || "",
      paternalSurname: authUser?.paternalSurname || "",
      email: authUser?.email || "",
      phoneNumber: authUser?.phone?.number || "",
      dni: authUser?.dni || "",
      companiesIds: authUser?.companiesIds || undefined,
    });
  };

  useEffect(() => {
    resetForm();
  }, [authUser]);

  const onSubmit = async (formData) => await updateProfile(formData);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Controller
            control={control}
            name="profilePhoto"
            render={({ field: { onChange, value, onBlur, name } }) => (
              <Upload
                label="Foto"
                accept="image/*"
                resize="313x370"
                buttonText="Subir foto"
                value={value}
                name={name}
                fileName={`profile-foto-${uuidv4()}`}
                filePath={`users/${authUser.id}/profile`}
                onChange={(file) => onChange(file)}
                required={required(name)}
                error={error(name)}
              />
            )}
          />
        </Col>
        <Col span={24} md={12}>
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <Input
                label="Nombres"
                name={name}
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
              />
            )}
          />
        </Col>
        <Col span={24} md={12}>
          <Controller
            name="dni"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <Input
                label="DNI"
                name={name}
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
              />
            )}
          />
        </Col>
        <Col span={24} md={12}>
          <Controller
            name="paternalSurname"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <Input
                label="Apellido paterno"
                name={name}
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
              />
            )}
          />
        </Col>

        <Col span={24} md={12}>
          <Controller
            name="maternalSurname"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <Input
                label="Apellido materno"
                name={name}
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
              />
            )}
          />
        </Col>
        <Col span={24}>
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <Input
                label="Email"
                name={name}
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
              />
            )}
          />
        </Col>
        <Col span={24}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, name, value } }) => (
              <Input
                label="Teléfono"
                type="number"
                name={name}
                onChange={onChange}
                value={value}
                error={error(name)}
                helperText={errorMessage(name)}
              />
            )}
          />
        </Col>
        {authUser.roleCode === "user" && (
          <Col span={24}>
            <Controller
              name="companiesIds"
              control={control}
              render={({ field: { onChange, name, value } }) => (
                <Select
                  label="Empresas de practicas"
                  mode="multiple"
                  value={value}
                  options={companiesView}
                  onChange={onChange}
                  error={error(name)}
                  helperText={errorMessage(name)}
                />
              )}
            />
          </Col>
        )}
      </Row>
      <Row justify="end" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            loading={putUserLoading}
          >
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
