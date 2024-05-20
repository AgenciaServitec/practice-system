import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
  TextArea,
  TimePicker,
  Title,
} from "../../../../components";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../hooks";
import moment from "moment/moment";
import { Modules } from "../../../../data-list";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router";
import {
  addPractice,
  getPracticesId,
  updatePractice,
} from "../../../../firebase/collections";
import { useGlobalData } from "../../../../providers";
import { capitalize } from "lodash";

export const PracticeIntegration = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { practices, users } = useGlobalData();
  const [practice, setPractice] = useState({});
  const [loading, setLoading] = useState(false);

  const usersSupervisorAcademicView = users
    .filter((user) => user.roleCode === "academic_supervisor")
    .map((user) => ({
      label: `${capitalize(user.paternalSurname)} ${capitalize(
        user.maternalSurname
      )} ${capitalize(user.firstName)}`,
      value: user.id,
    }));

  console.log(usersSupervisorAcademicView);

  const usersCoordinatorAcademicView = users
    .filter((user) => user.roleCode === "academic_coordinator")
    .map((user) => ({
      label: `${capitalize(user.paternalSurname)} ${capitalize(
        user.maternalSurname
      )} ${capitalize(user.firstName)}`,
      value: user.id,
    }));

  const onGoBack = () => navigate(-1);

  useEffect(() => {
    const _practice =
      practiceId === "new"
        ? { id: getPracticesId() }
        : practices.find((practice) => practice.id === practiceId);

    if (!_practice) return onGoBack();

    setPractice(_practice);
  }, []);

  const SavePractice = async (formData) => {
    try {
      setLoading(true);
      const _practice = mapPractice(formData);

      practiceId === "new"
        ? await addPractice(assignCreateProps(_practice))
        : await updatePractice(practice.id, assignUpdateProps(_practice));

      notification({ type: "success" });
      onGoBack();
    } catch (e) {
      console.error("ErrorSavePractice: ", e);
      notification({ type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const schema = yup.object({
    moduleNumber: yup.number().required(),
    name: yup.string(),
    task: yup.string().required(),
    hours: yup.number().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    supervisor: yup.string().required(),
    entryTime: yup.date().required(),
    departureTime: yup.date().required(),
    practiceArea: yup.string().required(),
    academicSupervisor: yup.string().required(),
    academicAreaCoordinator: yup.string().required(),
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

  const mapPractice = (formData) => ({
    ...practice,
    moduleNumber: formData?.moduleNumber,
    name: formData?.name.toLowerCase(),
    status: "pending",
    task: formData?.task.toLowerCase(),
    hours: +formData?.hours,
    startDate: moment(formData?.startDate).format("DD/MM/YYYY HH:mm"),
    endDate: moment(formData?.endDate).format("DD/MM/YYYY HH:mm"),
    supervisor: formData?.supervisor.toLowerCase(),
    entryTime: moment(formData?.entryTime).format("HH:mm:ss"),
    departureTime: moment(formData?.departureTime).format("HH:mm:ss"),
    practiceArea: formData?.practiceArea.toLowerCase(),
    academicSupervisor: formData?.academicSupervisor,
    academicAreaCoordinator: formData?.academicAreaCoordinator,
  });

  useEffect(() => {
    resetForm();
  }, [practice]);

  const resetForm = () => {
    reset({
      moduleNumber: practice.moduleNumber || "",
      name: capitalize(practice?.name) || "",
      task: capitalize(practice?.task) || "",
      hours: practice?.hours || "",
      startDate: practice?.startDate
        ? moment(practice?.startDate, "DD/MM/YYYY HH:mm")
        : undefined,
      endDate: practice?.endDate
        ? moment(practice?.endDate, "DD/MM/YYYY HH:mm")
        : undefined,
      supervisor: capitalize(practice?.supervisor) || "",
      entryTime: practice?.entryTime
        ? moment(practice?.entryTime, "HH:mm:ss")
        : undefined,
      departureTime: practice?.departureTime
        ? moment(practice?.departureTime, "HH:mm:ss")
        : undefined,
      practiceArea: practice?.practiceArea || "",
      academicSupervisor:
        usersSupervisorAcademicView.find(
          (user) => user.value === practice?.academicSupervisor
        )?.label || "",
      academicAreaCoordinator:
        usersCoordinatorAcademicView.find(
          (user) => user.value === practice?.academicAreaCoordinator
        )?.label || "",
    });
  };
  const onSubmit = (formData) => SavePractice(formData);

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>Registro de Prácticas Pre-Profesionales</Title>
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
                  <Input
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
            <Col span={24} md={4}>
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
            <Col span={24} md={4}>
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
            <Col span={24} md={4}>
              <Controller
                name="supervisor"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Input
                    label="Supervisor(a)"
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
            <Col span={24} md={4}>
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
            <Col span={24} md={8}>
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
                    ]}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="academicSupervisor"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Supervisor(a) Académico(a)"
                    value={value}
                    onChange={onChange}
                    options={usersSupervisorAcademicView}
                    error={error(name)}
                    required={required(name)}
                  />
                )}
              />
            </Col>
            <Col span={24} md={8}>
              <Controller
                name="academicAreaCoordinator"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <Select
                    label="Coordinador(a) del Área Académica"
                    value={value}
                    onChange={onChange}
                    options={usersCoordinatorAcademicView}
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
