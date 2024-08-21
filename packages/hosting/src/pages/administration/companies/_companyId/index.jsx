import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  notification,
  Select,
  Title,
  Upload,
} from "../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { useNavigate, useParams } from "react-router";
import { useAuthentication, useGlobalData } from "../../../../providers";
import {
  addCompany,
  getCompanyId,
  updateCompany,
} from "../../../../firebase/collections/companies";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiCompanyDataByRucGet } from "../../../../api";
import { capitalize } from "lodash";
import { fullName } from "../../../../utils";
import { v4 as uuidv4 } from "uuid";

export const CompanyIntegration = () => {
  const { authUser } = useAuthentication();
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { getCompanyDataByRuc } = useApiCompanyDataByRucGet();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { companies, users } = useGlobalData();
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(false);

  const isNew = companyId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    const _company = isNew
      ? { id: getCompanyId() }
      : companies.find((company) => company.id === companyId);

    if (!_company) return onGoBack();

    setCompany(_company);
  }, []);

  const mapCompany = (formData) => ({
    ...company,
    ruc: formData?.ruc,
    socialReason: formData?.socialReason,
    region: formData?.region,
    province: formData?.province,
    district: formData?.district,
    email: formData?.email,
    address: formData?.address,
    category: formData?.category,
    webSite: formData?.webSite,
    status: formData?.status,
    membersIds: formData?.membersIds,
    representativeId: formData?.representativeId,
    isotipoImage: formData?.isotipoImage || null,
    logotipoImage: formData?.logotipoImage || null,
  });

  const saveCompany = async (formData) => {
    try {
      setLoading(true);
      const _company = mapCompany(formData);

      isNew
        ? await addCompany(assignCreateProps(_company))
        : await updateCompany(company.id, assignUpdateProps(_company));

      notification({ type: "success" });
      onGoBack();
    } catch (e) {
      console.error("ErrorSaveCompany: ", e);
      notification({ type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Company
      authUser={authUser}
      isNew={isNew}
      users={users}
      company={company}
      getCompanyDataByRuc={getCompanyDataByRuc}
      loading={loading}
      onGoBack={onGoBack}
      onSaveCompany={saveCompany}
    />
  );
};

const Company = ({
  isNew,
  authUser,
  users,
  company,
  getCompanyDataByRuc,
  loading,
  onGoBack,
  onSaveCompany,
}) => {
  const isPractitioner = authUser?.roleCode === "user";

  const schema = yup.object({
    ruc: yup.string().min(11).max(11).required(),
    socialReason: yup.string().required(),
    region: yup.string().required(),
    province: yup.string().required(),
    district: yup.string().required(),
    email: isPractitioner
      ? yup.string().email().notRequired()
      : yup.string().email().required(),
    address: yup.string().required(),
    category: isPractitioner
      ? yup.string().notRequired()
      : yup.string().required(),
    webSite: isPractitioner
      ? yup.string().notRequired()
      : yup.string().required(),
    status: yup.string().required(),
    membersIds: yup.array().required(),
    representativeId: yup.string().required(),
    isotipoImage: yup.mixed(),
    logotipoImage: yup.mixed(),
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
    if (watch("ruc").length === 11) {
      (async () => {
        const companyResponse = await getCompanyDataByRuc(watch("ruc"));

        setValue(
          "socialReason",
          capitalize(company?.socialReason || companyResponse?.socialReason)
        );
        setValue(
          "region",
          capitalize(company?.department || companyResponse?.department)
        );
        setValue(
          "province",
          capitalize(company?.province || companyResponse?.province)
        );
        setValue(
          "province",
          capitalize(company?.province || companyResponse?.province)
        );
        setValue(
          "district",
          capitalize(company?.district || companyResponse?.district)
        );
        setValue(
          "address",
          capitalize(company?.address || companyResponse?.address)
        );
        setValue("status", company?.status || companyResponse?.status);
      })();
    }
  }, [watch("ruc")]);

  useEffect(() => {
    resetForm(company);
  }, [company]);

  const resetForm = (_company) => {
    reset({
      ruc: company?.ruc || "",
      socialReason: company?.socialReason || "",
      region: company?.region || "",
      province: company?.province || "",
      district: company?.district || "",
      email: company?.email || "",
      address: company?.address || "",
      category: company?.category || "",
      webSite: company?.webSite || "",
      status: company?.status || "inactive",
      membersIds: company?.membersIds || null,
      representativeId: company?.representativeId || "",
      isotipoImage: company?.isotipoImage || null,
      logotipoImage: company?.logotipoImage || null,
    });
  };

  const onSubmitSaveCompany = (formData) => onSaveCompany(formData);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Empresa</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmitSaveCompany)}>
          <Row gutter={[16, 16]}>
            <Col span={24} md={7}>
              <Controller
                name="ruc"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="N° RUC"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={!isNew}
                  />
                )}
              />
            </Col>
            <Col span={24} md={17}>
              <Controller
                name="socialReason"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Razón Social de la Empresa"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled
                  />
                )}
              />
            </Col>
            <Col span={24} md={6}>
              <Controller
                name="region"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Región"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24} md={6}>
              <Controller
                name="province"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Provincia"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24} md={6}>
              <Controller
                name="district"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Distrito"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24} md={6}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Correo"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="address"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Dirección"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12}>
              <Controller
                name="category"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Rubro"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24} md={12}>
              <Controller
                name="webSite"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Sitio Web"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24} md={4}>
              <Controller
                name="status"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Estado"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      {
                        label: "Activo",
                        value: "active",
                      },
                      {
                        label: "Inactivo",
                        value: "inactive",
                      },
                    ]}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24} md={10}>
              <Controller
                name="membersIds"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Miembros"
                    mode="multiple"
                    name={name}
                    value={value}
                    onChange={(value) => {
                      if (
                        !value.find(
                          (val) => val === watch("representativeId")
                        ) &&
                        value.length > 0
                      ) {
                        setValue("representativeId", value[0]);
                      }

                      if (value.length <= 0) {
                        setValue("representativeId", "");
                      }

                      return onChange(value);
                    }}
                    error={error(name)}
                    required={required(name)}
                    options={users.map((user) => ({
                      label: fullName(user),
                      value: user.id,
                    }))}
                    disabled={isPractitioner}
                  />
                )}
              />
            </Col>
            <Col span={24} md={10}>
              <Controller
                name="representativeId"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => {
                  return (
                    <Select
                      label="Representante"
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                      options={users
                        .filter((user) =>
                          (watch("membersIds") || []).includes(user.id)
                        )
                        .map((user) => ({
                          label: fullName(user),
                          value: user.id,
                        }))}
                      disabled={isPractitioner}
                    />
                  );
                }}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24} md={12}>
              <Controller
                control={control}
                name="isotipoImage"
                render={({ field: { onChange, value, onBlur, name } }) => (
                  <Upload
                    isImage
                    label="Isotipo (150x150):"
                    resize="150x150"
                    buttonText="Subir foto"
                    withThumbImage={false}
                    value={value}
                    name={name}
                    fileName={`isotype-${uuidv4()}`}
                    filePath={`companies/${company?.id}/images`}
                    onChange={(file) => onChange(file)}
                    required={required(name)}
                    error={error(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={12}>
              <Controller
                control={control}
                name="logotipoImage"
                render={({ field: { onChange, value, onBlur, name } }) => (
                  <Upload
                    isImage
                    label="Logotipo (350x117):"
                    resize="350x117"
                    buttonText="Subir foto"
                    withThumbImage={false}
                    value={value}
                    name={name}
                    fileName={`logotipoImage-${uuidv4()}`}
                    filePath={`companies/${company?.id}/images`}
                    onChange={(file) => onChange(file)}
                    required={required(name)}
                    error={error(name)}
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
                disabled={loading}
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
                loading={loading}
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
