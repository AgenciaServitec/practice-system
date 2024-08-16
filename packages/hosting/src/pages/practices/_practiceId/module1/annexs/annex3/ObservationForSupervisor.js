import React, { useEffect } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Acl,
  Button,
  DatePicker,
  Form,
  Input,
  Title,
} from "../../../../../../components";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormUtils } from "../../../../../../hooks";

export const ObservationForSupervisor = ({
  annex3,
  loading,
  onConfirmSaveSheet1,
}) => {
  const schema = yup.object({
    visitNumber: yup.string().required(),
    supervisionDate: yup.date().required(),
    progressStatus: yup.string().required(),
    observations: yup.string().required(),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
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
