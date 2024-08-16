import React from "react";
import {
  Button,
  Form,
  modalConfirm,
  notification,
  RadioGroup,
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
import styled from "styled-components";
import { InstructionsEvaluation } from "./InstructionsEvaluation";
import { isEmpty } from "lodash";

export const Sheet1Integration = ({ practice, user, annex4 }) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const mapForm = (formData) => ({
    evaluationSheet: [
      {
        id: "A",
        name: "ORGANIZACIÓN Y EJECUCIÓN DEL TRABAJO",
        indicators: [
          {
            id: 1,
            name: "Programa convenientemente su trabajo.",
            assessment: formData.A1,
          },
          {
            id: 2,
            name: "Trabajo rápido.",
            assessment: formData.A2,
          },
          {
            id: 3,
            name: "Identifica los objetos de la empresa.",
            assessment: formData.A3,
          },
        ],
      },
      {
        id: "B",
        name: "CAPACIDAD TÉCNICO EMPRESARIAL",
        indicators: [
          {
            id: 4,
            name: "Plantea soluciones acertadas a problemas que se originan en el trabajo.",
            assessment: formData.B4,
          },
          {
            id: 5,
            name: "Toma decisiones acertadas y oportunas.",
            assessment: formData.B5,
          },
          {
            id: 6,
            name: "Tiene habilidad para organizar, planificar y dirigir las prestaciones de servicios que ofrece la empresa.",
            assessment: formData.B6,
          },
          {
            id: 7,
            name: "Coopera con la conversación, mantenimiento de los equipos de la empresa.",
            assessment: formData.B7,
          },
        ],
      },
      {
        id: "C",
        name: "CUMPLIMIENTO EN EL TRABAJO",
        indicators: [
          {
            id: 8,
            name: "Demuestra seguridad, habilidad en el trabajo.",
            assessment: formData.C8,
          },
          {
            id: 9,
            name: "Usa adecuadamente: Registros, formularios, comprobantes, materiales, máquinas de oficina, taller, laboratorio o campo.",
            assessment: formData.C9,
          },
          {
            id: 10,
            name: "Es puntual y no llega tarde.",
            assessment: formData.C10,
          },
          {
            id: 11,
            name: "Disciplinado en la realización de tareas.",
            assessment: formData.C11,
          },
          {
            id: 12,
            name: "Se comunica con fluidez y propiedad.",
            assessment: formData.C12,
          },
        ],
      },
      {
        id: "D",
        name: "CALIDAD EN LA EJECUCIÓN",
        indicators: [
          {
            id: 13,
            name: "Calidad, presentación, cuidado en alto grado.",
            assessment: formData.D13,
          },
          {
            id: 14,
            name: "Denota interés por aprender cosas nuevas.",
            assessment: formData.D14,
          },
        ],
      },
      {
        id: "E",
        name: "TRABAJO EN EQUIPO",
        indicators: [
          {
            id: 15,
            name: "Tiene capacidad de integración, colaboración.",
            assessment: formData.E15,
          },
          {
            id: 16,
            name: "Tiene cortesía, buen trato y don de gente.",
            assessment: formData.E16,
          },
          {
            id: 17,
            name: "Realiza tareas en beneficio de sus compañeros.",
            assessment: formData.E17,
          },
        ],
      },
      {
        id: "F",
        name: "INICIATIVA",
        indicators: [
          {
            id: 18,
            name: "Participa activamente en los clubes deportivos y/o culturales de su empresa.",
            assessment: formData.F18,
          },
          {
            id: 19,
            name: "Muestra iniciativa y seriedad. Sus planteamientos son definidos.",
            assessment: formData.F19,
          },
          {
            id: 20,
            name: "Ejecuta acciones de adiestramiento espontáneo a sus compañeros de trabajo cuando lo requiera el caso.",
            assessment: formData.F20,
          },
        ],
      },
    ],
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
        title: "Evaluación del anexo 4 completa",
      });
    } catch (e) {
      console.log(e);
      notification({ type: "error" });
    }
  };

  const onConfirmSaveSheet1 = (formData) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: async () => await onSaveSheet1Annex4(formData),
    });

  return (
    <Sheet1 onSaveSheet1={onConfirmSaveSheet1} user={user} annex4={annex4} />
  );
};

const Sheet1 = ({ onSaveSheet1, user, annex4 }) => {
  const schema = yup.object({
    A1: yup.number().required(),
    A2: yup.number().required(),
    A3: yup.number().required(),
    B4: yup.number().required(),
    B5: yup.number().required(),
    B6: yup.number().required(),
    B7: yup.number().required(),
    C8: yup.number().required(),
    C9: yup.number().required(),
    C10: yup.number().required(),
    C11: yup.number().required(),
    C12: yup.number().required(),
    D13: yup.number().required(),
    D14: yup.number().required(),
    E15: yup.number().required(),
    E16: yup.number().required(),
    E17: yup.number().required(),
    F18: yup.number().required(),
    F19: yup.number().required(),
    F20: yup.number().required(),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { required, error } = useFormUtils({ errors, schema });

  const getAssessmentByIndicatorId = (indicators = [], indicatorId) => {
    console.log({ indicators });

    const indicator = (indicators || []).find(
      (indicator) => indicator?.id === indicatorId
    );

    return indicator?.assessment === undefined
      ? "Sin calificar"
      : indicator.assessment;
  };

  const [A, B, C, D, E, F] = annex4?.evaluationSheet || [];

  const onSubmit = (formData) => onSaveSheet1(formData);

  const qualityEvaluation = {
    A: {
      code: "A",
      name: "Muy buena",
    },
    B: {
      code: "B",
      name: "Buena",
    },
    C: {
      code: "C",
      name: "Aceptable",
    },
    D: {
      code: "D",
      name: "Deficiente",
    },
  };

  const validationQualityEvaluation = (note = 0) => {
    if (isEmpty(annex4?.evaluationSheet)) return;

    if (note == 19 || note == 20) {
      return qualityEvaluation["A"];
    }
    if (note >= 15 && note <= 18) {
      return qualityEvaluation["B"];
    }
    if (note == 13 || note == 14) {
      return qualityEvaluation["C"];
    }
    if (note <= 12) {
      return qualityEvaluation["D"];
    }
  };

  const arrayAllNotes = (annex4?.evaluationSheet || []).map((evaluation) =>
    evaluation.indicators.map((indicator) => indicator.assessment)
  );

  const allNotes = arrayAllNotes.flatMap((note) => note);

  const totalNotes = allNotes.reduce(
    (accumulator, note) => accumulator + note,
    0
  );

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={5}>
              II. INSTRUCCIONES PARA LA EVALUACIÓN CUALITATIVA:
            </Title>
          </Col>
          <Col span={24}>
            <InstructionsEvaluation />
          </Col>
          <Col span={24} md={20}>
            <span>
              <strong>A. ORGANIZACIÓN Y EJECUCIÓN DEL TRABAJO</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <span>Programa convenientemente su trabajo.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !A?.indicators ? (
              <Controller
                name="A1"
                control={control}
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(A?.indicators, 1)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Trabajo rápido.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !A?.indicators ? (
              <Controller
                name="A2"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(A?.indicators, 2)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Identifica los objetos de la empresa.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !A?.indicators ? (
              <Controller
                name="A3"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(A?.indicators, 3)}{" "}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              <strong>B. CAPACIDAD TÉCNICO EMPRESARIAL</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <span>
              Plantea soluciones acertadas a problemas que se originan en el
              trabajo.
            </span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !B?.indicators ? (
              <Controller
                name="B4"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(B?.indicators, 4)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Toma decisiones acertadas y oportunas.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !B?.indicators ? (
              <Controller
                name="B5"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(B?.indicators, 5)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              Tiene habilidad para organizar, planificar y dirigir las
              prestaciones de servicios que ofrece la empresa.
            </span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !B?.indicators ? (
              <Controller
                name="B6"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(B?.indicators, 6)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              Coopera con la conversación, mantenimiento de los equipos de la
              empresa.
            </span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !B?.indicators ? (
              <Controller
                name="B7"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(B?.indicators, 7)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              <strong>C. CUMPLIMIENTO EN EL TRABAJO</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <span>Demuestra seguridad, habilidad en el trabajo.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !C?.indicators ? (
              <Controller
                name="C8"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(C?.indicators, 8)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              Usa adecuadamente: Registros, formularios, comprobantes,
              materiales, máquinas de oficina, taller, laboratorio o campo.
            </span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !C?.indicators ? (
              <Controller
                name="C9"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(C?.indicators, 9)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Es puntual y no llega tarde.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !C?.indicators ? (
              <Controller
                name="C10"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(C?.indicators, 10)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Disciplinado en la realización de tareas.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !C?.indicators ? (
              <Controller
                name="C11"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(C?.indicators, 11)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Se comunica con fluidez y propiedad.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !C?.indicators ? (
              <Controller
                name="C12"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(C?.indicators, 12)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              <strong>D. CALIDAD EN LA EJECUCIÓN</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <span>Calidad, presentación, cuidado en alto grado.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !D?.indicators ? (
              <Controller
                name="D13"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(D?.indicators, 13)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Denota interés por aprender cosas nuevas.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !D?.indicators ? (
              <Controller
                name="D14"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(D?.indicators, 14)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              <strong>E. TRABAJO EN EQUIPO</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <span>Tiene capacidad de integración, colaboración.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !E?.indicators ? (
              <Controller
                name="E15"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(E?.indicators, 15)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Tiene cortesía, buen trato y don de gente.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !E?.indicators ? (
              <Controller
                name="E16"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(E?.indicators, 16)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>Realiza tareas en beneficio de sus compañeros.</span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !E?.indicators ? (
              <Controller
                name="E17"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(E?.indicators, 17)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              <strong>F. INICIATIVA</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <span>
              Participa activamente en los clubes deportivos y/o culturales de
              su empresa.
            </span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !F?.indicators ? (
              <Controller
                name="F18"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(F?.indicators, 18)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              Muestra iniciativa y seriedad. Sus planteamientos son definidos.
            </span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !F?.indicators ? (
              <Controller
                name="F19"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(F?.indicators, 19)}
              </span>
            )}
          </Col>
          <Col span={24} md={20}>
            <span>
              Ejecuta acciones de adiestramiento espontáneo a sus compañeros de
              trabajo cuando lo requiera el caso.
            </span>
          </Col>
          <Col>
            {user?.roleCode === "company_representative" && !F?.indicators ? (
              <Controller
                name="F20"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, name } }) => (
                  <RadioGroup
                    label="CALIF."
                    value={value}
                    onChange={onChange}
                    error={error(name)}
                    required={required(name)}
                    options={[
                      { label: "0", value: 0 },
                      { label: "1", value: 1 },
                    ]}
                  />
                )}
              />
            ) : (
              <span className="assessment">
                {getAssessmentByIndicatorId(F?.indicators, 20)}
              </span>
            )}
          </Col>
          <br />
          <br />
          <Col span={24} md={20} className="totalAssesment">
            <Title level={5}>
              <strong>PUNTAJE TOTAL:</strong>
            </Title>
          </Col>
          <Col span={24} md={4}>
            <span>
              <strong>{totalNotes ? totalNotes : "--"}</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <Title level={5}>
              <strong>EVALUACIÓN CUALITATIVA:</strong>
            </Title>
          </Col>
          <Col span={24} md={4}>
            <span>
              <strong>
                {validationQualityEvaluation(totalNotes)?.name || "--"}
              </strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <Title level={5}>
              <strong>EVALUACIÓN LITERAL:</strong>
            </Title>
          </Col>
          <Col span={24} md={4}>
            <span>
              <strong>
                {validationQualityEvaluation(totalNotes)?.code || "--"}
              </strong>
            </span>
          </Col>
        </Row>
        {user?.roleCode === "company_representative" &&
          !annex4?.evaluationSheet && (
            <Row justify="end" gutter={[16, 16]}>
              <Col span={24} sm={6} md={4}>
                <Button type="primary" size="large" block htmlType="submit">
                  Guardar
                </Button>
              </Col>
            </Row>
          )}
      </Form>
    </Container>
  );
};

const Container = styled.div`
  .assessment {
    font-size: 14px;
    font-weight: 600;
  }
`;
