import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputPassword,
  notification,
  Select,
  Title,
} from "../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import { useNavigate, useParams } from "react-router";
import { useGlobalData } from "../../../../providers";
import {
  addCompany,
  getCompanyId,
  updateCompany,
} from "../../../../firebase/collections/companies";
import { yupResolver } from "@hookform/resolvers/yup";
import { useApiCompanyDataByRucGet } from "../../../../api";
import { capitalize } from "lodash";
import { CompanyStatus } from "../../../../data-list";

export const CompanyIntegration = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { getCompanyDataByRuc } = useApiCompanyDataByRucGet();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { companies } = useGlobalData();
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(false);

  const onGoBack = () => navigate(-1);

  const isNew = companyId === "new";

  useEffect(() => {
    const _company = isNew
      ? { id: getCompanyId() }
      : companies.find((company) => company.id === companyId);

    if (!_company) return onGoBack();

    setCompany(_company);
  }, []);

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

  const schema = yup.object({
    ruc: yup.string().min(11).max(11).required(),
    name: yup.string().required(),
    phone: yup.string().min(9).max(9).required(),
    region: yup.string().required(),
    province: yup.string().required(),
    district: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    boss: yup.string().required(),
    representative: yup.string().required(),
    category: yup.string().required(),
    webSite: yup.string().required(),
    user: yup.string().email().required(),
    password: yup.string().required(),
    status: yup.string().required(),
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

  const mapCompany = (formData) => ({
    ...company,
    ruc: formData?.ruc,
    name: formData?.name,
    phone: formData?.phone,
    region: formData?.region,
    province: formData?.province,
    district: formData?.district,
    email: formData?.email,
    address: formData?.address,
    boss: formData?.boss,
    representative: formData?.representative,
    category: formData?.category,
    webSite: formData?.webSite,
    user: formData?.user,
    password: formData?.password,
    status: formData?.status === "activo" ? "active" : "inactive",
  });

  const fetchCompanyByRuc = async () => await getCompanyDataByRuc(watch("ruc"));

  useEffect(() => {
    const existsRuc = watch("ruc").length === 11;
    if (existsRuc || !isNew) {
      (async () => {
        const company = await fetchCompanyByRuc(watch("ruc"));

        setValue("name", capitalize(company?.socialReason));
        setValue("region", capitalize(company?.department));
        setValue("province", capitalize(company?.province));
        setValue("province", capitalize(company?.province));
        setValue("district", capitalize(company?.district));
        setValue("address", capitalize(company?.address));
        setValue("status", capitalize(company?.status));
      })();
    }
  }, [watch("ruc")]);

  useEffect(() => {
    resetForm(company);
  }, [company]);

  const resetForm = (_company) => {
    reset({
      ruc: company?.ruc || "",
      name: company?.name || "",
      phone: company?.phone || "",
      region: company?.region || "",
      province: company?.province || "",
      district: company?.district || "",
      email: company?.email || "",
      address: company?.address || "",
      boss: company?.boss || "",
      representative: company?.representative || "",
      category: company?.category || "",
      webSite: company?.webSite || "",
      user: company?.user || "",
      password: company?.password || "",
      status: company?.status || "",
    });
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Registro del Evaluador y Empresa</Title>
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(saveCompany)}>
          <Row gutter={[16, 16]}>
            <Col span={24} md={5}>
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
                  />
                )}
              />
            </Col>
            <Col span={24} md={15}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Razón Social de la Empresa"
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={4}>
              <Controller
                name="phone"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="N° Teléfono"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
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
                  />
                )}
              />
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24} md={6}>
              <Controller
                name="boss"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Jefe"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={6}>
              <Controller
                name="representative"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Representante"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
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
                  />
                )}
              />
            </Col>
            <Col span={24} md={10}>
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
                  />
                )}
              />
            </Col>
            <Col span={24} md={5}>
              <Controller
                name="user"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Usuario (Email)"
                    name={name}
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={5}>
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
