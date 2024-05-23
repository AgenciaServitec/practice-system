import React from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  TimePicker,
  Title,
  modalConfirm,
  notification,
} from "../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../../../hooks";
import moment from "moment";
import { firestore } from "../../../../../firebase";
import styled from "styled-components";
import { PracticeArea } from "../../../../../data-list";

export const Sheet1Integration = ({ practice, practitioner, company }) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const mapForm = (formData) => ({
    refreshment: formData.refreshment,
    mobility: formData.mobility,
    others: formData.others,
  });

  const onSaveSheet1Annex2 = async (formData) => {
    try {
      const _annex2 = mapForm(formData);

      await firestore
        .collection("practices")
        .doc(practice.id)
        .collection("annexs")
        .doc("annex2")
        .update({ ...assignUpdateProps(_annex2) });

      notification({ type: "success" });
    } catch (e) {
      console.log(e);
      notification({ type: "error", description: "No se pudo guardar" });
    }
  };

  const onConfirmSheet1 = (practice) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres aprobar esta hoja?",
      onOk: async () => await onSaveSheet1Annex2(practice),
    });

  return (
    <Sheet1
      practice={practice}
      company={company}
      practitioner={practitioner}
      onConfirmSheet1={onConfirmSheet1}
    />
  );
};

const Sheet1 = ({ practice, company, practitioner, onConfirmSheet1 }) => {
  const schema = yup.object({
    refreshment: yup.string(),
    mobility: yup.string(),
    others: yup.string(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>I. DATOS DE LA EMPRESA O INSTITUCIÓN</Title>
        </Col>
        <Col span={24}>
          <div>
            <p>Razón Social de la Empresa: </p>
            <p>{company?.socialReason}</p>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div>
            <p>Dirección: </p>
            <p>{company?.address}</p>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div>
            <p>Distrito: </p>
            <p>{company?.district}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Teléfono: </p>
            <p>{company?.phone}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Encargado del control de Prácticas Pre-Profesionales: </p>
            <p>{company?.representative}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Cargo: </p>
            <p>{company?.category}</p>
          </div>
        </Col>
        <Col span={24}>
          <Title level={5}>II. DATOS DEL PRACTICANTE</Title>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Apellidos y Nombres: </p>
            <p>
              {practitioner?.paternalSurname} {practitioner?.maternalSurname}{" "}
              {practitioner?.firstName}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Carrera Profesional: </p>
            <p>{practitioner?.ProfessionalCareer}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Turno: </p>
            <p>{practitioner?.shift}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Semestre: </p>
            <p>{practitioner?.semester}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Año Académico: </p>
            <p>{practitioner?.academicYear}</p>
          </div>
        </Col>
        <Col span={24}>
          <Title level={5}>
            III. LA EMPRESA O INSTITUCIÓN OFRECE LO SIGUIENTE
          </Title>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Período de la práctica: </p>
            <p>
              {moment(practice?.startDate, "D/MM/YY").format("D MMMM YYYY")} al
              {moment(practice?.endDate, "D/MM/YY").format("D MMMM YYYY")}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Horario: </p>
            <p>
              {moment(practice?.entryTime, "HH:mm:ss").format("HH:mm a")} -
              {moment(practice?.departureTime, "HH:mm:ss").format("HH:mm a")}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <p>Dpto. Sector o Área de las Prácticas: </p>
            <p>{PracticeArea[practice?.practiceArea].name}</p>
          </div>
        </Col>
        <Col span={24}>
          <Form onSubmit={handleSubmit(onConfirmSheet1)}>
            <Row gutter={[16, 16]}>
              <Col span={24} md={8}>
                <Controller
                  name="refreshment"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="Refrigerio (opcional)"
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
                  name="mobility"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="Movilidad (opcional)"
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
                  name="others"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="Otros (opcional)"
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
                <Button type="primary" danger size="large" block>
                  Aprobar
                </Button>
              </Col>
              <Col span={24} sm={6} md={4}>
                <Button type="primary" size="large" block htmlType="submit">
                  Revisado
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  div {
    p:last-child {
      font-weight: 500;
      text-transform: capitalize;
    }
  }
`;
