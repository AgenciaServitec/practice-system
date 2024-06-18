import React, { useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  modalConfirm,
  notification,
  Select,
  TimePicker,
  Title,
} from "../../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import { ProfessionalCareer } from "../../../../../../../data-list";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDefaultFirestoreProps,
  useFormUtils,
} from "../../../../../../../hooks";
import { firestore } from "../../../../../../../firebase";
import moment from "moment/moment";

export const Sheet1Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
  annex4,
  onSavePractice,
}) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const mapForm = (formData) => ({
    professionalCareer: formData.professionalCareer,
    shift: formData.shift,
    semester: formData.semester,
    academicYear: formData.academicYear,
    startDate: formData.startDate,
    endDate: formData.endDate,
    entryTime: formData.entryTime,
    departureTime: formData.departureTime,
    practiceArea: formData.practiceArea,
    refreshment: formData.refreshment,
    mobility: formData.mobility,
    others: formData.others,
    status: "pending",
  });

  const onSaveSheet1Annex4 = async (formData) => {
    try {
      await firestore
        .collection("practices")
        .doc(practice.id)
        .collection("annexs")
        .doc("annex4")
        .update({ ...assignUpdateProps(mapForm(formData)) });

      notification({
        type: "success",
        title:
          "Felicidades por completar el anexo 3, ahora solo debes esperar la aprobación de un supervisor académico",
      });
    } catch (e) {
      console.log(e);
      notification({ type: "error" });
    }
  };

  const onConfirmSaveSheet1 = (practice) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: async () => await onSaveSheet1Annex4(practice),
    });

  return (
    <Sheet1
      annex4={annex4}
      onConfirmSaveSheet1={onConfirmSaveSheet1}
      user={user}
      practice={practice}
    />
  );
};

const Sheet1 = ({ annex4, onConfirmSaveSheet1, user, practice }) => {
  const schema = yup.object({
    professionalCareer: yup.string().required(),
    shift: yup.string().required(),
    semester: yup.string().required(),
    academicYear: yup.string().required(),
    startDate: yup.date().required(),
    endDate: yup.date().required(),
    entryTime: yup.string().required(),
    departureTime: yup.string().required(),
    practiceArea: yup.string().required(),
    refreshment: yup.string().required(),
    mobility: yup.string().required(),
    others: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [annex4]);

  const resetForm = () => {
    reset({
      professionalCareer: annex4?.professionalCareer || "",
      shift: annex4?.shift || "",
      semester: annex4?.semester || "",
      academicYear: annex4?.academicYear || "",
      startDate: annex4?.startDate ? moment(annex4.startDate.toDate()) : null,
      endDate: annex4?.endDate ? moment(annex4.endDate.toDate()) : null,
      entryTime: annex4?.entryTime || "",
      departureTime: annex4?.departureTime || "",
      practiceArea: annex4?.practiceArea || "",
      refreshment: annex4?.refreshment || "",
      mobility: annex4?.mobility || "",
      others: annex4?.others || "",
    });
  };

  return (
    <Form onSubmit={handleSubmit(onConfirmSaveSheet1)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>I. DATOS PERSONALES:</Title>
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
        <Col span={24} md={5}>
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
        <Col span={24} md={5}>
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
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24} sm={6} md={4}>
          <Button
            type="primary"
            danger
            size="large"
            block
            onClick={() => onConfirmSaveSheet1()}
          >
            Aprobar
          </Button>
        </Col>
        <Col span={24} sm={6} md={4}>
          <Button type="primary" size="large" block htmlType="submit">
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
