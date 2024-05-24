import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputPassword,
  notification,
  RadioGroup,
  Select,
} from "../../components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../hooks";
import * as yup from "yup";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiPersonDataByDniGet,
  useApiUserPost,
} from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthentication } from "../../providers";
import { capitalize } from "lodash";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { getAcademicYearBySemester } from "../../utils";
import moment from "moment";

export const RegisterUser = ({ roleCode }) => {
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const {
    getPersonDataByDni,
    getPersonDataByDniResponse,
    getPersonDataByDniLoading,
  } = useApiPersonDataByDniGet();
  const { loginWithEmailAndPassword } = useAuthentication();
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    dni: yup.number().required(),
    firstName: yup.string().required(),
    paternalSurname: yup.string().required(),
    maternalSurname: yup.string().required(),
    phoneNumber: yup.string().min(9).max(9).required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
    tuitionId: yup.string().required(),
    isGraduate: yup.boolean().required(),
    studentShift: yup.string().when("isGraduate", {
      is: true,
      then: yup.string().notRequired(),
      otherwise: yup.string().required(),
    }),
    semester: yup.string().when("isGraduate", {
      is: true,
      then: yup.string().notRequired(),
      otherwise: yup.string().required(),
    }),
    academicYear: yup.string().when("isGraduate", {
      is: true,
      then: yup.string().notRequired(),
      otherwise: yup.string().required(),
    }),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { isGraduate: false },
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  const mapUser = (formData) => ({
    roleCode: roleCode, //user
    dni: formData.dni,
    firstName: formData.firstName,
    paternalSurname: formData.paternalSurname,
    maternalSurname: formData.maternalSurname,
    phone: {
      prefix: "+51",
      number: formData.phoneNumber,
    },
    email: formData.email,
    password: formData.password,
    practitionerData: {
      isGraduate: formData.isGraduate,
      tuitionId: formData?.tuitionId,
      studentShift: formData?.studentShift || null,
      semester: formData?.semester || null,
      academicYear: formData?.academicYear
        ? `${moment(formData.academicYear, "YYYY").format(
            "YYYY"
          )} ${getAcademicYearBySemester(formData.semester)}`
        : null,
    },
  });

  const onSaveUser = async (formData) => {
    try {
      setLoading(true);

      const response = await postUser(mapUser(formData));
      if (!postUserResponse.ok) {
        throw new Error(response);
      }

      notification({
        type: "success",
        title: "¡El usuario se guardó correctamente!",
      });

      await loginWithEmailAndPassword(formData.email, formData.password);
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    } finally {
      setLoading(false);
    }
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
              getPersonDataByDniLoading && (
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
        name="tuitionId"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Código de matricula"
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
        name="isGraduate"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <RadioGroup
            label="¿Eres egresado?"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
            options={[
              {
                label: "No",
                value: false,
              },
              {
                label: "Si",
                value: true,
              },
            ]}
          />
        )}
      />
      {!watch("isGraduate") && (
        <>
          <Controller
            name="studentShift"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Select
                label="Turno"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
                options={[
                  {
                    label: "Diurno",
                    value: "diurno",
                  },
                  {
                    label: "Nocturno",
                    value: "nocturno",
                  },
                ]}
              />
            )}
          />
          <Controller
            name="semester"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <Select
                label="Semestre"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
                options={[
                  {
                    label: "Ciclo: I",
                    value: "I",
                  },
                  {
                    label: "Ciclo: II",
                    value: "II",
                  },
                  {
                    label: "Ciclo: III",
                    value: "III",
                  },
                  {
                    label: "Ciclo: IV",
                    value: "IV",
                  },
                  {
                    label: "Ciclo: V",
                    value: "V",
                  },
                  {
                    label: "Ciclo: VI",
                    value: "VI",
                  },
                ]}
              />
            )}
          />
          <Controller
            name="academicYear"
            control={control}
            render={({ field: { onChange, value, name } }) => (
              <DatePicker
                label="Año Académico"
                format="YYYY"
                picker="year"
                onChange={onChange}
                value={value}
                name={name}
                error={error(name)}
                helperText={errorMessage(name)}
                required={required(name)}
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
        loading={loading || postUserLoading}
      >
        Registrarme
      </Button>
    </Form>
  );
};
