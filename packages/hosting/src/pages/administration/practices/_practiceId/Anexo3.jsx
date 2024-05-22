import React from "react";
import { Form, Input, Title } from "../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../../hooks";
import * as yup from "yup";

export const Anexo3 = () => {
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
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Title level={3}>
          Anexo 3: Ficha de supervisión y monitoreo de prácticas
          pre-profesionales
        </Title>
      </Col>
      <Col span={24}>
        <Form>
          <Row gutter={[16, 16]}>
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
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
