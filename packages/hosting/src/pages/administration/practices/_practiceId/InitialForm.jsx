import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  notification,
  Select,
  TextArea,
  TimePicker,
} from "../../../../components";
import { useFormUtils } from "../../../../hooks";
import moment from "moment/moment";
import { Modules } from "../../../../data-list";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { capitalize } from "lodash";
import { fullName } from "../../../../utils";
import { useNavigate } from "react-router";
import { Alert } from "antd";

export const InitialPracticeFormIntegration = ({
  isNew,
  practice,
  users,
  user,
  practitioner,
  companies,
  company,
  onSavePractice,
}) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const onNavigateGoTo = (pathname) => navigate(pathname);

  const mapPractice = (formData) => ({
    ...practice,
    practitionerId: isNew ? user.id : practitioner?.id,
    moduleNumber: formData?.moduleNumber,
    companyId: formData?.companyId,
    name: formData?.name.toLowerCase(),
    status: "pending",
    task: formData?.task.toLowerCase(),
    hours: +formData?.hours,
    startDate: formData?.startDate
      ? moment(formData.startDate, "DD/MM/YYYY HH:mm").format(
          "DD/MM/YYYY HH:mm"
        )
      : null,
    endDate: formData?.endDate
      ? moment(formData?.endDate, "DD/MM/YYYY HH:mm").format("DD/MM/YYYY HH:mm")
      : null,
    entryTime: formData?.entryTime
      ? moment(formData.entryTime, "HH:mm:ss").format("HH:mm:ss")
      : null,
    departureTime: formData?.departureTime
      ? moment(formData.departureTime, "HH:mm:ss").format("HH:mm:ss")
      : null,
    practiceArea: formData?.practiceArea.toLowerCase(),
    academicCoordinatorId: formData?.academicCoordinatorId,
    academicSupervisorId: formData?.academicSupervisorId,
    companyRepresentativeId:
      companies.find((company) => company.id === formData.companyId)
        ?.representativeId || null,
  });

  const saveInitialForm = async (formData) => {
    try {
      setLoading(true);
      const _practice = mapPractice(formData);

      onSavePractice(_practice);

      notification({ type: "success" });

      onNavigateGoTo(`/practices/${_practice.id}`);
    } catch (e) {
      console.error("ErrorSavePractice: ", e);
      notification({ type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <InitialPracticeForm
      isNew={isNew}
      practice={practice}
      users={users}
      companies={companies}
      company={company}
      loading={loading}
      onSaveInitialForm={saveInitialForm}
    />
  );
};

const InitialPracticeForm = ({
  isNew,
  practice,
  users,
  companies,
  company,
  loading,
  onSaveInitialForm,
}) => {
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
    academicCoordinatorId: yup.string().required(),
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
        ? moment(practice?.startDate, "DD/MM/YYYY HH:mm")
        : undefined,
      endDate: practice?.endDate
        ? moment(practice?.endDate, "DD/MM/YYYY HH:mm")
        : undefined,
      entryTime: practice?.entryTime
        ? moment(practice?.entryTime, "HH:mm:ss")
        : undefined,
      departureTime: practice?.departureTime
        ? moment(practice?.departureTime, "HH:mm:ss")
        : undefined,
      practiceArea: practice?.practiceArea || "",
      academicCoordinatorId: practice?.academicCoordinatorId || "",
      academicSupervisorId: practice?.academicSupervisorId || "",
      companyRepresentativeId:
        practice?.companyRepresentativeId || company?.representativeId || "",
    });
  };

  const onSubmit = (formData) => onSaveInitialForm(formData);

  return (
    <Row gutter={[16, 24]}>
      <Col span={24}>
        <Alert
          type="info"
          showIcon
          message="Si no encuentras la empresa de tus practicas, debes pedir a tu
          representante de empresa que se registre en la plataforma!"
        />
      </Col>
      <Col span={24}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[16, 16]}>
            <Col span={24} md={4}>
              <Controller
                name="moduleNumber"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="N° de Módulo"
                    value={value}
                    onChange={onChange}
                    options={[
                      {
                        label: "1",
                        value: 1,
                      },
                      {
                        label: "2",
                        value: 2,
                      },
                      {
                        label: "3",
                        value: 3,
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
                defaultValue=""
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
            <Col span={24}>
              <Controller
                name="companyId"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Empresa"
                    value={value}
                    onChange={onChange}
                    options={companies.map((user) => ({
                      label: capitalize(user.socialReason),
                      value: user.id,
                    }))}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24}>
              <Controller
                name="task"
                control={control}
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
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
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <TimePicker
                    label="Hora de entrada"
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
                name="departureTime"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <TimePicker
                    label="Hora de salida"
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
                name="practiceArea"
                control={control}
                defaultValue=""
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
                name="academicCoordinatorId"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Coordinador(a) Académico(a)"
                    value={value}
                    onChange={onChange}
                    options={users
                      .filter(
                        (user) => user.roleCode === "academic_coordinator"
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
            <Col span={24} md={9}>
              <Controller
                name="academicSupervisorId"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Supervisor(a) Académico(a)"
                    value={value}
                    onChange={onChange}
                    options={users
                      .filter((user) => user.roleCode === "academic_supervisor")
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
          <Row justify="end" gutter={[16, 16]}>
            {/*<Col xs={24} sm={6} md={4}>*/}
            {/*  <Button*/}
            {/*    type="default"*/}
            {/*    size="large"*/}
            {/*    block*/}
            {/*    onClick={() => onGoBack()}*/}
            {/*    disabled={loading}*/}
            {/*  >*/}
            {/*    Cancelar*/}
            {/*  </Button>*/}
            {/*</Col>*/}
            <Col xs={24} md={8}>
              <Button
                type="primary"
                size="large"
                block
                htmlType="submit"
                loading={loading}
              >
                {isNew ? "Crear Practica" : "Actualizar"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
