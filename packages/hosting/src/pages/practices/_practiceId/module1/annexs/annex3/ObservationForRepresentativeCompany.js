import React, { useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Acl, Button, Form, Input, Title } from "../../../../../../components";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../../../../hooks";

export const ObservationForRepresentativeCompany = ({
  annex3,
  loading,
  onConfirmSaveSheet1,
}) => {
  const schema = yup.object({
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
      difficultiesDetected: annex3?.difficultiesDetected || "",
      suggestionsRecommendations: annex3?.suggestionsRecommendations || "",
    });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit(onConfirmSaveSheet1)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={5}>
              I. FICHA DE SUPERVISIÓN Y MONITOREO DE PRÁCTICAS
              PRE-PROFESIONALES:
            </Title>
          </Col>
          <Col span={24}>
            <Controller
              name="difficultiesDetected"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Dificultades detectadas"
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
            <Controller
              name="suggestionsRecommendations"
              control={control}
              defaultValue=""
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="Sugerencias y recomendaciones"
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
        <Acl name="/practices/:practiceId/annex#save">
          <Row justify="end" gutter={[16, 16]}>
            <Col span={24} sm={6} md={4}>
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
        </Acl>
      </Form>
    </div>
  );
};
