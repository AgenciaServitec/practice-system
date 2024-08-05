import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useNavigate, useParams } from "react-router";
import Title from "antd/lib/typography/Title";
import {
  Button,
  Form,
  Input,
  InputNumber,
  InputPassword,
  notification,
  Select,
} from "../../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useFormUtils } from "../../../../hooks";
import { useAuthentication, useGlobalData } from "../../../../providers";
import { assign, capitalize } from "lodash";
import { Roles } from "../../../../data-list";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiPersonDataByDniGet,
  useApiUserPost,
  useApiUserPut,
} from "../../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const UserIntegration = () => {
  const { authUser } = useAuthentication();
  const navigate = useNavigate();
  const { userId } = useParams();
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const { putUser, putUserResponse, putUserLoading } = useApiUserPut();
  const {
    getPersonDataByDni,
    getPersonDataByDniResponse,
    getPersonDataByDniLoading,
  } = useApiPersonDataByDniGet();

  const { rolesAcls, users } = useGlobalData();

  const [user, setUser] = useState({});

  const isNew = userId === "new";

  useEffect(() => {
    const _user = isNew ? {} : users.find((user) => user.id === userId);

    if (!_user) return navigate(-1);

    setUser(_user);
  }, []);

  const saveUser = async (formData) => {
    try {
      const _user = mapUserToApi(formData);

      const response = isNew ? await postUser(_user) : await putUser(_user);

      if (isNew ? !postUserResponse.ok : !putUserResponse.ok) {
        throw new Error(response);
      }

      notification({
        type: "success",
        title: "¡El usuario se guardó correctamente!",
      });

      return onGoBack();
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };
  const {
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: { isGraduate: false },
  });

  const mapUserToApi = (formData) =>
    assign(
      {},
      {
        ...(user?.id && { id: user.id }),
        roleCode:
          authUser.roleCode === "company_representative"
            ? "user"
            : formData.roleCode,
        firstName: formData.firstName.toLowerCase(),
        paternalSurname: formData.paternalSurname.toLowerCase(),
        maternalSurname: formData.maternalSurname.toLowerCase(),
        email: formData.email.toLowerCase(),
        password: formData.password,
        dni: formData.dni,
        phone: {
          prefix: "+51",
          number: formData.phoneNumber,
        },
        acls: rolesAcls.find((role) => role.id === formData.roleCode)?.acls || [
          "/home",
          "/profile",
        ],
        updateBy: `${authUser.firstName} ${authUser.paternalSurname} ${authUser.maternalSurname}|${authUser.dni}`,
      }
    );

  const onGoBack = () => navigate(-1);

  return (
    <User
      authUser={authUser}
      user={user}
      onSaveUser={saveUser}
      onGoBack={onGoBack}
      isSavingUser={postUserLoading || putUserLoading}
      getPersonDataByDniLoading={getPersonDataByDniLoading}
      getPersonDataByDni={getPersonDataByDni}
      getPersonDataByDniResponse={getPersonDataByDniResponse}
    />
  );
};

const User = ({
  authUser,
  user,
  onSaveUser,
  onGoBack,
  isSavingUser,
  getPersonDataByDniLoading,
  getPersonDataByDni,
  getPersonDataByDniResponse,
}) => {
  const schema = yup.object({
    roleCode: yup.string().required(),
    firstName: yup.string().required(),
    paternalSurname: yup.string().required(),
    maternalSurname: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    dni: yup
      .string()
      .min(8)
      .max(8)
      .required()
      .transform((value) => (value === null ? "" : value)),
    phoneNumber: yup
      .string()
      .min(9)
      .max(9)
      .required()
      .transform((value) => (value === null ? "" : value)),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [user]);

  const resetForm = () => {
    reset({
      roleCode: user?.roleCode || "",
      firstName: user?.firstName || "",
      paternalSurname: user?.paternalSurname || "",
      maternalSurname: user?.maternalSurname || "",
      email: user?.email || "",
      password: user?.password || "",
      dni: user?.dni || "",
      phoneNumber: user?.phone?.number || "",
    });
  };

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
          const response = await getPersonDataByDni(watch("dni"));

          if (!getPersonDataByDniResponse.ok) {
            throw new Error(response);
          }

          userResetFields(response);
        } catch (e) {
          const errorResponse = await getApiErrorResponse(e);
          apiErrorNotification(errorResponse);
          userResetFields(null);
        }
      })();
    }
  }, [watch("dni")]);

  const onSubmit = (formData) => onSaveUser(formData);
  console.log(authUser);

  const roleOptions =
    authUser.roleCode === "company_representative"
      ? [{ label: "Usuario", value: "user" }]
      : Roles.map((role) => ({
          label: capitalize(role.name),
          value: role.code,
        }));

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>
          {authUser.roleCode === "company_representative"
            ? "Agregar Practicante"
            : "Agregar Usuario"}
        </Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Controller
                name="roleCode"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Rol predeterminado"
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={roleOptions}
                  />
                )}
              />
            </Col>
            <Col span={24}>
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
                    required={required(name)}
                    suffix={
                      getPersonDataByDniLoading && (
                        <FontAwesomeIcon icon={faSpinner} spin />
                      )
                    }
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Nombres"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="paternalSurname"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Apellido paterno"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="maternalSurname"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Apellido materno"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Email"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <InputPassword
                    label="Contraseña"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>

            <Col span={24}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <InputNumber
                    label="Ingrese teléfono"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
          </Row>
          <Row justify="end" gutter={[16, 16]}>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="default"
                size="large"
                block
                onClick={() => onGoBack()}
                disabled={isSavingUser}
              >
                Cancelar
              </Button>
            </Col>
            <Col xs={24} sm={6} md={4}>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={isSavingUser}
              >
                Guardar
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
