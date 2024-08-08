import React, { useEffect } from "react";
import {
  Acl,
  Button,
  DatePicker,
  Form,
  Input,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDefaultFirestoreProps,
  useFormUtils,
} from "../../../../../../hooks";
import { firestore } from "../../../../../../firebase";
import { ObservationsList } from "../../ObservationsList";
import dayjs from "dayjs";
import { fullName } from "../../../../../../utils";

export const Sheet1Integration = ({ practice, annex3, user }) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const mapForm = (formData) => ({
    visitNumber: formData.visitNumber,
    supervisionDate: formData.supervisionDate,
    progressStatus: formData.progressStatus,
    observations: formData.observations,
    difficultiesDetected: formData.difficultiesDetected,
    suggestionsRecommendations: formData.suggestionsRecommendations,
    status: "pending",
  });

  const onSaveSheet1Annex3 = async (formData) => {
    try {
      await firestore
        .collection("practices")
        .doc(practice.id)
        .collection("annexs")
        .doc("annex3")
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
      onOk: async () => await onSaveSheet1Annex3(practice),
    });

  return (
    <Sheet1
      annex3={annex3}
      onConfirmSaveSheet1={onConfirmSaveSheet1}
      user={user}
      practice={practice}
    />
  );
};

const Sheet1 = ({ annex3, onConfirmSaveSheet1, user, practice }) => {
  const schema = yup.object({
    visitNumber: yup.string().required(),
    supervisionDate: yup.date().required(),
    progressStatus: yup.string().required(),
    observations: yup.string().required(),
    difficultiesDetected: yup.string().required(),
    suggestionsRecommendations: yup.string().required(),
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
  }, [annex3]);

  const resetForm = () => {
    reset({
      visitNumber: annex3?.visitNumber || "",
      supervisionDate: annex3?.supervisionDate
        ? dayjs(annex3.supervisionDate.toDate())
        : null,
      progressStatus: annex3?.progressStatus || "",
      observations: annex3?.observations || "",
      difficultiesDetected: annex3?.difficultiesDetected || "",
      suggestionsRecommendations: annex3?.suggestionsRecommendations || "",
    });
  };

  const hasPermission = user?.roleCode === "academic_supervisor";

  return (
    <Form onSubmit={handleSubmit(onConfirmSaveSheet1)}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>
            I. FICHA DE SUPERVISIÓN Y MONITOREO DE PRÁCTICAS PRE-PROFESIONALES:
          </Title>
        </Col>
        {hasPermission ? (
          <Col span={24}>
            <Controller
              name="visitNumber"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="N° de Visita"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
        ) : (
          <Col span={24} md={8}>
            <div className="item">
              <label>Número de Visita: </label>
              <p>{annex3?.visitNumber || "-"}</p>
            </div>
          </Col>
        )}
        {hasPermission ? (
          <Col span={24}>
            <Controller
              name="supervisionDate"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <DatePicker
                  label="Fecha de Supervisión"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
        ) : (
          <Col span={24} md={8}>
            <div className="item">
              <label>Fecha de Supervisión: </label>
              <p>
                {annex3.supervisionDate
                  ? dayjs(annex3?.supervisionDate.toDate()).format("DD/MM/YYYY")
                  : "-"}
              </p>
            </div>
          </Col>
        )}
        {hasPermission ? (
          <Col span={24}>
            <Controller
              name="progressStatus"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Estado de avance (en horas y %)"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
        ) : (
          <Col span={24} md={8}>
            <div className="item">
              <label>Estado de Avance (en %): </label>
              <p>
                {annex3?.progressStatus || "-"}
                &nbsp;%
              </p>
            </div>
          </Col>
        )}
        {hasPermission ? (
          <Col span={24}>
            <Controller
              name="observations"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Observaciones"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
        ) : (
          <Col span={24} md={8}>
            <div className="item">
              <label>Observaciones: </label>
              <p>{annex3?.observations || "-"}</p>
            </div>
          </Col>
        )}
        {hasPermission ? (
          <Col span={24}>
            <Controller
              name="difficultiesDetected"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Dificultades detectadas durante las prácticas"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
        ) : (
          <Col span={24} md={8}>
            <div className="item">
              <label>Dificultades detectadas durante las prácticas: </label>
              <p>{annex3?.difficultiesDetected || "-"}</p>
            </div>
          </Col>
        )}
        {hasPermission ? (
          <Col span={24}>
            <Controller
              name="suggestionsRecommendations"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Sugerencias y Recomendaciones"
                  name={name}
                  value={value}
                  onChange={onChange}
                  error={error(name)}
                  required={required(name)}
                />
              )}
            />
          </Col>
        ) : (
          <Col span={24} md={8}>
            <div className="item">
              <label>Sugerencias y Recomendaciones: </label>
              <p>{annex3?.suggestionsRecommendations || "-"}</p>
            </div>
          </Col>
        )}
      </Row>
      {hasPermission ? (
        <Row justify="end" gutter={[16, 16]}>
          <Col span={24} sm={6} md={4}>
            <Button type="primary" size="large" block htmlType="submit">
              Guardar
            </Button>
          </Col>
        </Row>
      ) : (
        ""
      )}
      <ObservationsList user={user} annex={annex3} practice={practice} />
      <Acl name="/practices/:practiceId/annex#save"></Acl>
    </Form>
  );
};
