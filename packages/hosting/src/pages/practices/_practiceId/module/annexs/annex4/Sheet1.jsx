import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  modalConfirm,
  notification,
  RadioGroup,
  Row,
  Title,
} from "../../../../../../components";
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
import { evaluationSheet } from "../../../../../../data-list";

export const Sheet1Integration = ({ practice, user, annex4 }) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();
  const [totalScore, setTotalScore] = useState(null);
  const [qualitativeEvaluation, setQualitativeEvaluation] = useState(undefined);
  const [literalEvaluation, setLiteralEvaluation] = useState(undefined);

  useEffect(() => {
    setTotalScore(annex4?.result?.qualitativeEvaluation);
    setQualitativeEvaluation(annex4?.result?.literalEvaluation);
    setLiteralEvaluation(annex4?.result?.totalScore);
  }, [annex4]);

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
    result: {
      totalScore: totalScore,
      qualitativeEvaluation: qualitativeEvaluation,
      literalEvaluation: literalEvaluation,
    },
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
    <Sheet1
      onSaveSheet1={onConfirmSaveSheet1}
      user={user}
      annex4={annex4}
      totalScore={totalScore}
      onSetTotalScore={setTotalScore}
      qualitativeEvaluation={qualitativeEvaluation}
      onSetQualitativeEvaluation={setQualitativeEvaluation}
      literalEvaluation={literalEvaluation}
      onSetLiteralEvaluation={setLiteralEvaluation}
    />
  );
};

const Sheet1 = ({
  onSaveSheet1,
  user,
  annex4,
  totalScore,
  onSetTotalScore,
  qualitativeEvaluation,
  onSetQualitativeEvaluation,
  literalEvaluation,
  onSetLiteralEvaluation,
}) => {
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { required, error } = useFormUtils({ errors, schema });

  const getAssessmentByIndicatorId = (criteriaId, indicatorId) => {
    const criteria = (annex4?.evaluationSheet || []).find(
      (_question) => _question.id === criteriaId
    );

    const indicator = (criteria?.indicators || []).find(
      (_indicator) => _indicator.id === indicatorId
    );

    return indicator?.assessment === undefined
      ? "Sin calificar"
      : indicator.assessment;
  };

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
    if (totalScore === 0) return;

    if (note <= 12.5) {
      return qualityEvaluation["D"];
    } else if (note >= 13 && note <= 14.5) {
      return qualityEvaluation["C"];
    } else if (note >= 15 && note <= 18.5) {
      return qualityEvaluation["B"];
    } else if (note >= 19) {
      return qualityEvaluation["A"];
    }
  };

  useEffect(() => {
    if (!isEmpty(annex4?.result)) return;

    const notes = [
      watch("A1"),
      watch("A2"),
      watch("A3"),
      watch("B4"),
      watch("B5"),
      watch("B6"),
      watch("B7"),
      watch("C8"),
      watch("C9"),
      watch("C10"),
      watch("C11"),
      watch("C12"),
      watch("D13"),
      watch("D14"),
      watch("E15"),
      watch("E16"),
      watch("E17"),
      watch("F18"),
      watch("F19"),
      watch("F20"),
    ].reduce((acc, value) => acc + value, 0);

    onSetTotalScore(notes);
    onSetQualitativeEvaluation(validationQualityEvaluation(totalScore)?.name);
    onSetLiteralEvaluation(validationQualityEvaluation(totalScore)?.code);
  }, [
    watch("A1"),
    watch("A2"),
    watch("A3"),
    watch("B4"),
    watch("B5"),
    watch("B6"),
    watch("B7"),
    watch("C8"),
    watch("C9"),
    watch("C10"),
    watch("C11"),
    watch("C12"),
    watch("D13"),
    watch("D14"),
    watch("E15"),
    watch("E16"),
    watch("E17"),
    watch("F18"),
    watch("F19"),
    watch("F20"),
    totalScore,
  ]);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={5}>
              II. INSTRUCCIONES PARA LA EVALUACIÓN CUALITATIVA:
            </Title>
            <InstructionsEvaluation />
          </Col>
          {evaluationSheet.map((criteria) => (
            <Col key={criteria.id} span={24}>
              <Row gutter={[16, 16]}>
                <Col span={24} md={20}>
                  <span>
                    <strong>{criteria.nameSection}</strong>
                  </span>
                </Col>
                {criteria.indicators.map((indicator) => (
                  <Col key={indicator.id} span={24}>
                    <Row gutter={[16, 16]}>
                      <Col span={24} md={20}>
                        <span>{indicator.text}</span>
                      </Col>
                      <Col>
                        {user?.roleCode === "company_representative" &&
                        !annex4?.evaluationSheet ? (
                          <Controller
                            name={indicator.name}
                            control={control}
                            defaultValue={0}
                            render={({ field: { onChange, value, name } }) => (
                              <RadioGroup
                                label="CALIF."
                                value={value}
                                onChange={onChange}
                                error={error(name)}
                                required={required(name)}
                                options={indicator.options}
                              />
                            )}
                          />
                        ) : (
                          <span className="assessment">
                            {getAssessmentByIndicatorId(
                              criteria.id,
                              indicator.id
                            )}
                          </span>
                        )}
                      </Col>
                    </Row>
                  </Col>
                ))}
              </Row>
            </Col>
          ))}
          <Col span={24} md={20} className="totalAssesment">
            <Title level={5}>
              <strong>PUNTAJE TOTAL:</strong>
            </Title>
          </Col>
          <Col span={24} md={4}>
            <span>
              <strong>{totalScore || "---"}</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <Title level={5}>
              <strong>EVALUACIÓN CUALITATIVA:</strong>
            </Title>
          </Col>
          <Col span={24} md={4}>
            <span>
              <strong>{qualitativeEvaluation || "---"}</strong>
            </span>
          </Col>
          <Col span={24} md={20}>
            <Title level={5}>
              <strong>EVALUACIÓN LITERAL:</strong>
            </Title>
          </Col>
          <Col span={24} md={4}>
            <span>
              <strong>{literalEvaluation || "---"}</strong>
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
