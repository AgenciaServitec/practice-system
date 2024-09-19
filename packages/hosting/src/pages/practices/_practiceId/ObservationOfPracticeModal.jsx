import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../hooks";
import {
  Button,
  Col,
  Form,
  Modal,
  modalConfirm,
  notification,
  Row,
  TextArea,
} from "../../../components";
import React from "react";
import dayjs from "dayjs";
import { updatePractice } from "../../../firebase/collections";
import { v1 as uuidv1 } from "uuid";

export const ObservationOfPracticeModal = ({
  practice,
  visibleForm,
  onSetVisibleForm,
}) => {
  const uid = uuidv1();

  const mapForm = (formData) => ({
    observations: [
      ...(practice?.observations || []),
      {
        id: uid,
        createAt: dayjs().format("DD/MM/YYYY HH:mm:ss"),
        status: "pending",
        value: formData.observation,
        isDeleted: false,
      },
    ],
  });
  const saveObservationPractice = async (formData) => {
    try {
      onSetVisibleForm(true);

      await updatePractice(practice.id, mapForm(formData));

      notification({
        type: "success",
        title: "Se envió la observación",
      });

      onSetVisibleForm(false);
    } catch (e) {
      console.error(e);
      notification({ type: "error" });
    }
  };

  const confirmSaveObservationPractice = (formData) =>
    modalConfirm({
      title: "¿Estás seguro de enviar la observación?",
      onOk: async () => await saveObservationPractice(formData),
    });

  return (
    <Modal
      title="Observación de Práctica"
      open={visibleForm}
      closable
      onCancel={() => onSetVisibleForm(!visibleForm)}
    >
      <ObservationOfPractice
        onConfirmSaveObservationPractice={confirmSaveObservationPractice}
        visibleForm={visibleForm}
      />
    </Modal>
  );
};

const ObservationOfPractice = ({ onConfirmSaveObservationPractice }) => {
  const schema = yup.object({
    observation: yup.string(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  const onSubmit = (formData) => onConfirmSaveObservationPractice(formData);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Controller
            name="observation"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value, name } }) => (
              <TextArea
                label="Observación"
                name={name}
                value={value}
                autoSize={{ minRows: 3 }}
                onChange={onChange}
                error={error(name)}
                required={required(name)}
              />
            )}
          />
        </Col>
      </Row>
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24}>
          <Button type="primary" size="large" block htmlType="submit">
            Agregar observación
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
