import React, { useEffect, useState } from "react";
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
import { useFormUtils } from "../../hooks";
import * as yup from "yup";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiCompanyDataByRucGet,
  useApiUserPost,
} from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { capitalize } from "lodash";
import { useAuthentication } from "../../providers";

export const RegisterCompany = ({ type }) => {
  const { postUser, postUserResponse, postUserLoading } = useApiUserPost();
  const {
    getCompanyDataByRuc,
    getCompanyDataByRucResponse,
    getCompanyDataByRucLoading,
  } = useApiCompanyDataByRucGet();
  const { loginWithEmailAndPassword } = useAuthentication();

  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    ruc: yup.number().required(),
    socialReason: yup.string().required(),
    region: yup.string().required(),
    province: yup.string().required(),
    district: yup.string().required(),
    address: yup.string().required(),
    status: yup.string().required(),
    representative: yup.string().required(),
    category: yup.string().required(),
    webSite: yup.string(),
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

  const mapCompany = (formData) => ({
    type: type,
    ruc: formData.ruc,
    socialReason: formData.socialReason.toLowerCase(),
    region: formData.region.toLowerCase(),
    province: formData.province.toLowerCase(),
    district: formData.district.toLowerCase(),
    address: formData.address.toLowerCase(),
    status: formData.status,
    representative: formData.representative.toLowerCase(),
    category: formData.category.toLowerCase(),
    webSite: (formData?.webSite || "").toLowerCase(),
    phone: {
      prefix: "+51",
      number: formData.phoneNumber,
    },
    email: formData.email,
    password: formData.password,
  });

  const onSaveCompany = async (formData) => {
    try {
      setLoading(true);

      const user = mapCompany(formData);

      const response = await postUser(user);

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
      setLoading(false);
    }
  };

  const companyResetFields = (company) => {
    setValue("socialReason", capitalize(company?.socialReason || ""));
    setValue("region", capitalize(company?.department || ""));
    setValue("province", capitalize(company?.province || ""));
    setValue("district", capitalize(company?.district || ""));
    setValue("address", capitalize(company?.address || ""));
    setValue("status", capitalize(company?.status || ""));
  };

  useEffect(() => {
    const existsRuc = (watch("ruc") || "").length === 11;
    if (existsRuc) {
      (async () => {
        try {
          const response = await getCompanyDataByRuc(watch("ruc"));

          if (!getCompanyDataByRucResponse.ok) {
            throw new Error(response);
          }

          companyResetFields(response);
        } catch (e) {
          const errorResponse = await getApiErrorResponse(e);
          apiErrorNotification(errorResponse);
          companyResetFields(null);
        }
      })();
    }
  }, [watch("ruc")]);

  const onSubmit = async (formData) => await onSaveCompany(formData);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="ruc"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="RUC"
            type="number"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
            suffix={
              getCompanyDataByRucLoading && (
                <FontAwesomeIcon icon={faSpinner} spin />
              )
            }
          />
        )}
      />
      <Controller
        name="socialReason"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Razón Social"
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
        name="region"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Región"
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
        name="province"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Provincia"
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
        name="district"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Distrito"
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
        name="address"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Dirección"
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
        name="status"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Estado"
            onChange={onChange}
            value={value}
            name={name}
            error={error(name)}
            helperText={errorMessage(name)}
            required={required(name)}
            disabled
          />
        )}
      />
      <Controller
        name="representative"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Representante"
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
        name="category"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Rubro"
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
        name="website"
        control={control}
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Sitio Web"
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
          <InputNumber
            label="Teléfono"
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
        loading={loading || postUserLoading}
      >
        Registrarme
      </Button>
    </Form>
  );
};
