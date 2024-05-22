import React from "react";
import {
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Title,
} from "../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import { ProfessionalCareer } from "../../../../../data-list";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../../../hooks";

export const Sheet1Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
  onSavePractice,
}) => {
  return <Sheet1 />;
};

const Sheet1 = () => {
  const schema = yup.object({
    socialReason: yup.string().required(),
    address: yup.string().required(),
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

  return (
    <Form>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4}>Datos de la Empresa o Institución</Title>
        </Col>
        <Col span={24}>
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
              />
            )}
          />
        </Col>
        <Col span={24} md={12}>
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
        <Col span={24} md={12}>
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
        <Col span={24} md={8}>
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Teléfono"
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
            name="representative"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Encargado del control de Prácticas Pre-Profesionales"
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
            name=""
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Cargo"
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
          <Title level={4}>Datos del Practicante</Title>
        </Col>
        <Col span={24} md={8}>
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
        <Col span={24} md={8}>
          <Controller
            name="paternalSurname"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Apellido Paterno"
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
            name="maternalSurname"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Apellido Materno"
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
            name="professionalCareer"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Select
                label="Carrera Profesional"
                value={value}
                onChange={onChange}
                options={ProfessionalCareer}
                error={error(name)}
                required={required(name)}
              />
            )}
          />
        </Col>
        <Col span={24} md={6}>
          <Controller
            name="shift"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Turno"
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
            name="semester"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Semestre"
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
            name="academicYear"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Año Académico"
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
          <Title level={4}>La Empresa o Institución ofrece lo siguiente</Title>
        </Col>
        <Col span={24} md={4}>
          <Controller
            name="startDate"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <DatePicker
                label="Fecha de Inicio de la práctica"
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
                label="Fecha de Término de la práctica"
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
        <Col span={24} md={6}>
          <Controller
            name="refreshment"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Refrigerio"
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
            name="mobility"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Movilidad"
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
            name="others"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <Input
                label="Otros"
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
    </Form>
  );
};
