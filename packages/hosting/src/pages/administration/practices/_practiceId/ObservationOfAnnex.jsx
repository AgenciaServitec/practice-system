import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../../hooks";
import {
  Button,
  Form,
  Modal,
  modalConfirm,
  notification,
  TextArea,
} from "../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import React, { useEffect } from "react";
import { updateAnnex } from "../../../../firebase/collections/annexs";
import { v1 as uuidv1 } from "uuid";
import styled from "styled-components";
import moment from "moment";

export const ObservationOfAnnexIntegration = ({
  practice,
  user,
  visibleForm,
  onSetVisibleForm,
  annex,
}) => {
  const uid = uuidv1();

  const mapFormCompanyRepresentative = (formData) => ({
    observationsCompanyRepresentative: [
      ...(annex?.observationsCompanyRepresentative || []),
      {
        id: uid,
        createAt: moment().format("DD/MM/YYYY HH:mm:ss"),
        status: "pending",
        value: formData.observation,
      },
    ],
  });
  const mapFormAcademicSupervisor = (formData) => ({
    observationsAcademicSupervisor: [
      ...(annex?.observationsAcademicSupervisor || []),
      {
        id: uid,
        createAt: moment().format("DD/MM/YYYY HH:mm:ss"),
        status: "pending",
        value: formData.observation,
      },
    ],
  });

  const saveObservation = async (formData) => {
    try {
      if (user.roleCode === "company_representative") {
        await updateAnnex(
          practice.id,
          annex.id,
          mapFormCompanyRepresentative(formData)
        );
      }

      if (user.roleCode === "academic_supervisor") {
        await updateAnnex(
          practice.id,
          annex.id,
          mapFormAcademicSupervisor(formData)
        );
      }

      notification({
        type: "success",
        title: "Se envió la observación",
      });

      onSetVisibleForm(false);
    } catch (e) {
      console.log(e);
      notification({ type: "error" });
    }
  };

  const confirmSaveObservation = (formData) =>
    modalConfirm({
      title: "¿Estás seguro de enviar la observación?",
      onOk: async () => await saveObservation(formData),
    });

  return (
    <Modal
      title="Observación"
      open={visibleForm}
      closable
      onCancel={() => onSetVisibleForm(false)}
    >
      <ObservationForm
        onConfirmSaveObservation={confirmSaveObservation}
        visibleForm={visibleForm}
      />
    </Modal>
  );
};

const ObservationForm = ({ onConfirmSaveObservation, visibleForm }) => {
  const schema = yup.object({
    observation: yup.string().required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    !visibleForm && setValue("observation", "");
  }, [visibleForm]);

  const onSubmit = (formData) => onConfirmSaveObservation(formData);

  return (
    <Container>
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
              Enviar
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
