import React from "react";
import { Button, Form, Select, Title } from "../../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../../../../../hooks";
import { ProfessionalCareer } from "../../../../../../../data-list";

export const Sheet2Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
  annex4,
  onSavePractice,
}) => {
  const onConfirmSaveSheet2 = (formData) => {
    console.log("DatosDeFormulario: ", formData);
  };

  return <Sheet1 onConfirmSheet2={onConfirmSaveSheet2} />;
};

const Sheet1 = ({ onConfirmSheet2 }) => {
  const schema = yup.object({
    socialReason: yup.string().required(),
    address: yup.string().required(),
  });

  const {
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  return (
    <Form>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>
            II. INSTRUCCIONES PARA LA EVALUACIÓN CUALITATIVA:
          </Title>
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
      </Row>
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24} sm={6} md={4}>
          <Button type="primary" size="large" block htmlType="submit">
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
