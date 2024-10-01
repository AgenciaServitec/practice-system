import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Button,
  Col,
  DataEntryModal,
  DatePicker,
  FixedButtonsWrap,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
  TextArea,
  TimePicker,
  Title,
} from "../../../components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import {
  addAnnex,
  addPractice,
  fetchPracticesByPractitionerId,
  getPracticesId,
  updateUser,
} from "../../../firebase/collections";
import { useNavigate } from "react-router";
import {
  fullName,
  getCompanyRepresentative,
  getNameId,
  getUserData,
} from "../../../utils";
import { Modules } from "../../../data-list";
import { capitalize, isEmpty, omit, uniq } from "lodash";
import dayjs from "dayjs";
import { useGlobalData } from "../../../providers";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NewCompanyModal } from "./NewCompanyModal";
import styled from "styled-components";

export const ManageCreateProductIntegration = ({
  practice,
  users,
  user,
  companies,
  company,
  onGoBack,
}) => {
  const { practices } = useGlobalData();

  const navigate = useNavigate();

  const [savingPractice, setSavingPractice] = useState(false);

  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();

  const onClickToProduct = (practiceId) => {
    const url = `/practices/${practiceId}`;

    navigate(url);
  };

  const mapPractice = (formData) => ({
    ...practice,
    id: getPracticesId(),
    nameId: getNameId(formData.name),
    practitioner: omit(getUserData(user.id, users), ["acls"]) || null,
    practitionerId: user.id,
    moduleNumber: formData?.moduleNumber,
    companyId: formData?.companyId,
    name: formData?.name.toLowerCase(),
    status: "pending",
    task: formData?.task.toLowerCase(),
    hours: +formData?.hours,
    startDate: formData?.startDate
      ? dayjs(formData.startDate).format("DD/MM/YYYY HH:mm")
      : null,
    endDate: formData?.endDate
      ? dayjs(formData?.endDate).format("DD/MM/YYYY HH:mm")
      : null,
    entryTime: formData?.entryTime
      ? dayjs(formData.entryTime).format("HH:mm:ss")
      : null,
    departureTime: formData?.departureTime
      ? dayjs(formData.departureTime).format("HH:mm:ss")
      : null,
    practiceArea: formData?.practiceArea.toLowerCase(),
    academicSupervisor:
      omit(getUserData(formData?.academicSupervisorId, users), ["acls"]) ||
      null,
    academicSupervisorId: formData?.academicSupervisorId || null,
    companyRepresentative:
      omit(getCompanyRepresentative(formData?.companyId, companies, users), [
        "acls",
      ]) || null,
    companyRepresentativeId:
      getCompanyRepresentative(formData?.companyId, companies, users)
        ?.representativeId || null,
    searchData: [
      formData?.moduleNumber,
      user?.id,
      formData?.companyId,
      formData?.academicSupervisorId,
      formData?.practiceArea,
    ].filter((item) => item),
  });

  const validateExistsModule = async (practice) => {
    const userPractices = await fetchPracticesByPractitionerId(
      practice.practitionerId
    );
    return userPractices.some(
      (userPractice) => userPractice?.moduleNumber === practice?.moduleNumber
    );
  };

  const savePractice = async (formData) => {
    try {
      setSavingPractice(true);

      const practice = mapPractice(formData);
      const existsModule = await validateExistsModule(practice);

      if (existsModule)
        return notification({
          type: "warning",
          title: "El numero del modulo ya existe en otra práctica",
        });

      const promises = ["annex2", "annex3", "annex4", "annex6"].map((annex) =>
        addAnnex(practice.id, {
          id: annex,
          status: "pending",
          ...(["annex2", "annex3", "annex4"].includes(annex) && {
            approvedByCompanyRepresentative: "pending",
          }),
          approvedByAcademicSupervisor: "pending",
        })
      );

      const p0 = updateUser(
        practice.practitionerId,
        assignUpdateProps({
          companiesIds: uniq([
            formData.companyId,
            ...(user?.companiesIds || []),
          ]),
          hasPractices: true,
        })
      );
      const p1 = addPractice(assignCreateProps(practice));

      await Promise.all([...promises, p0, p1]);

      notification({ type: "success" });
      onClickToProduct(practice.id);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingPractice(false);
    }
  };

  return (
    <ManageCreateProduct
      savingPractice={savingPractice}
      practice={practice}
      company={company}
      companies={companies}
      users={users}
      practices={practices}
      savePractice={savePractice}
      onGoBack={onGoBack}
    />
  );
};

const ManageCreateProduct = ({
  savingPractice,
  practice,
  company,
  companies,
  users,
  practices,
  savePractice,
  onGoBack,
}) => {
  const [isVisibleNewCompanyModal, setIsVisibleNewCompanyModal] =
    useState(false);
  const [isCompanyDataComplete, setIsCompanyDataComplete] = useState(true);

  const schema = yup.object({
    moduleNumber: yup.number().required(),
    name: yup.string().required(),
    companyId: yup.string().required(),
    task: yup.string().required(),
    hours: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    entryTime: yup.date().required(),
    departureTime: yup.date().required(),
    practiceArea: yup.string().required(),
    academicSupervisorId: yup.string().required(),
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
    watch("moduleNumber") &&
      setValue(
        "name",
        Modules.find((module) => module.id === watch("moduleNumber"))?.name ||
          ""
      );
  }, [watch("moduleNumber")]);

  useEffect(() => {
    if (isEmpty(watch("companyId"))) return;

    const company = companies.find(
      (_company) => _company.id === watch("companyId")
    );

    const _isCompanyDataComplete =
      !isEmpty(company?.email) &&
      !isEmpty(company?.address) &&
      !isEmpty(company?.category) &&
      !isEmpty(company?.webSite);

    setIsCompanyDataComplete(_isCompanyDataComplete);
  }, [watch("companyId")]);

  useEffect(() => {
    resetForm();
  }, [practice]);

  const resetForm = () => {
    reset({
      moduleNumber: practice.moduleNumber || "",
      name: capitalize(practice?.name || ""),
      companyId: practice?.companyId || "",
      task: capitalize(practice?.task || ""),
      hours: practice?.hours || 0,
      startDate: practice?.startDate
        ? dayjs(practice?.startDate, "DD/MM/YYYY HH:mm")
        : undefined,
      endDate: practice?.endDate
        ? dayjs(practice?.endDate, "DD/MM/YYYY HH:mm")
        : undefined,
      entryTime: practice?.entryTime
        ? dayjs(practice?.entryTime, "HH:mm:ss")
        : undefined,
      departureTime: practice?.departureTime
        ? dayjs(practice?.departureTime, "HH:mm:ss")
        : undefined,
      practiceArea: practice?.practiceArea || "",
      academicSupervisorId: practice?.academicSupervisor?.id || "",
    });
  };

  const existModule = (moduleNumber) =>
    practices.some((_practice) => _practice.moduleNumber === moduleNumber);

  const onSubmit = (formData) => savePractice(formData);

  return (
    <Row>
      <DataEntryModal visible={true} onCancel={onGoBack}>
        <Title level={3}>Nueva práctica pre-profesional</Title>
        <Alert
          type="info"
          showIcon
          message="Si no encuentras la empresa de tus prácticas, hay un boton para Agregar empresa y luego lo selecciones"
        />
        <br />
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row gutter={[16, 16]}>
              <Col span={24} md={4}>
                <Controller
                  name="moduleNumber"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Select
                      label="N° de Módulo"
                      value={value}
                      onChange={onChange}
                      options={[
                        {
                          label: "1",
                          value: 1,
                          disabled: existModule(1),
                        },
                        {
                          label: "2",
                          value: 2,
                          disabled: existModule(2),
                        },
                        {
                          label: "3",
                          value: 3,
                          disabled: existModule(3),
                        },
                      ]}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
              <Col span={24} md={20}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="Nombre del módulo"
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
              <Col span={24} md={19}>
                <Controller
                  name="companyId"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <>
                      <Select
                        label="Empresa"
                        value={value}
                        onChange={onChange}
                        options={companies.map((_company) => ({
                          label: capitalize(_company.socialReason),
                          value: _company.id,
                        }))}
                        error={error(name)}
                        required={required(name)}
                      />
                      {!isCompanyDataComplete && (
                        <p className="message-company">
                          La empresa seleccionada debe completar sus datos:
                          Correo, Dirección, Rubro y Sitio Web.
                        </p>
                      )}
                    </>
                  )}
                />
              </Col>
              <Col span={24} md={5}>
                <Button
                  type="primary"
                  icon={<FontAwesomeIcon icon={faPlus} />}
                  block
                  onClick={setIsVisibleNewCompanyModal}
                >
                  Agregar empresa
                </Button>
                <NewCompanyModal
                  visible={isVisibleNewCompanyModal}
                  onClickVisibleModal={setIsVisibleNewCompanyModal}
                />
              </Col>
              <Col span={24}>
                <Controller
                  name="task"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <TextArea
                      label="Tarea desarrollada"
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
                  name="hours"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <InputNumber
                      label="Horas"
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
                  name="startDate"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <DatePicker
                      label="Fecha de Inicio"
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
                  name="endDate"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <DatePicker
                      label="Fecha de Término"
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
                  name="entryTime"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <TimePicker
                      label="Hora de entrada"
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                      format="HH:mm a"
                    />
                  )}
                />
              </Col>
              <Col span={24} md={5}>
                <Controller
                  name="departureTime"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <TimePicker
                      label="Hora de salida"
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                      format="HH:mm a"
                    />
                  )}
                />
              </Col>
              <Col span={24} md={6}>
                <Controller
                  name="practiceArea"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Select
                      label="Área de Prácticas"
                      value={value}
                      onChange={onChange}
                      options={[
                        {
                          label: "Oficina",
                          value: "office",
                        },
                        {
                          label: "Taller",
                          value: "workshop",
                        },
                        {
                          label: "Laboratorio",
                          value: "laboratory",
                        },
                        {
                          label: "Granja",
                          value: "farm",
                        },
                        {
                          label: "Almacén",
                          value: "store",
                        },
                        {
                          label: "Otro",
                          value: "other",
                        },
                      ]}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
              <Col span={24} md={9}>
                <Controller
                  name="academicSupervisorId"
                  control={control}
                  render={({ field: { onChange, value, name } }) => (
                    <Select
                      label="Supervisor(a) Académico(a)"
                      value={value}
                      onChange={onChange}
                      options={users
                        .filter(
                          (user) => user.roleCode === "academic_supervisor"
                        )
                        .map((user) => ({
                          label: fullName(user),
                          value: user.id,
                        }))}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
            </Row>
            <FixedButtonsWrap>
              <Row justify="start" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Button
                    block
                    htmlType="submit"
                    type="primary"
                    size="large"
                    loading={savingPractice}
                    disabled={!isCompanyDataComplete}
                  >
                    Crear Práctica
                  </Button>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Button
                    block
                    size="large"
                    onClick={() => onGoBack()}
                    disabled={savingPractice}
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </FixedButtonsWrap>
          </Form>
        </Container>
      </DataEntryModal>
    </Row>
  );
};

const Container = styled.section`
  width: 100%;

  form {
    width: 100%;
  }

  .message-company {
    font-size: 0.7rem;
    color: red;
  }
`;
