import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
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

export const CompanyIntegration = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const { getCompanyDataByRuc } = useApiCompanyDataByRucGet();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { companies, users } = useGlobalData();
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
    socialReason: yup.string().required(),
    region: yup.string().required(),
    province: yup.string().required(),
    district: yup.string().required(),
    email: yup.string().email().required(),
    address: yup.string().required(),
    category: yup.string().required(),
    webSite: yup.string().required(),
    status: yup.string().required(),
    membersIds: yup.array().of(yup.string()).required(),
    representativeId: yup.string().required(),
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
    socialReason: formData?.socialReason,
    region: formData?.region,
    province: formData?.province,
    district: formData?.district,
    email: formData?.email,
    address: formData?.address,
    category: formData?.category,
    webSite: formData?.webSite,
    status: formData?.status === "activo" ? "active" : "inactive",
    membersIds: formData?.membersIds,
    representativeId: formData?.representativeId,
  });

  const fetchCompanyByRuc = async () => await getCompanyDataByRuc(watch("ruc"));

  useEffect(() => {
    const existsRuc = watch("ruc").length === 11;
    if (existsRuc || !isNew) {
      (async () => {
        const company = await fetchCompanyByRuc(watch("ruc"));

        setValue("socialReason", capitalize(company?.socialReason));
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
      socialReason: company?.socialReason || "",
      region: company?.region || "",
      province: company?.province || "",
      district: company?.district || "",
      email: company?.email || "",
      address: company?.address || "",
      category: company?.category || "",
      webSite: company?.webSite || "",
      status: company?.status || "",
      membersIds: company?.membersIds || null,
      representativeId: company?.representativeId || "",
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
            <Col span={24} md={19}>
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
                    disabled
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
            <Col span={24} md={10}>
              <Controller
                name="membersIds"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="IDs de Miembros"
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
                      label: `${user.firstName} ${user.paternalSurname} ${user.maternalSurname}`,
                      value: user.id,
                    }))}
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
                      label="ID del Representante"
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
                          label: `${user.firstName} ${user.paternalSurname} ${user.maternalSurname}`,
                          value: user.id,
                        }))}
                    />
                  );
                }}
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
