import React, { useEffect } from "react";
import {
  Acl,
  Button,
  Form,
  Input,
  modalConfirm,
  notification,
  ObservationsList,
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

export const Sheet1Integration = ({ practice, user, annex2 }) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const mapForm = (formData) => ({
    refreshment: formData.refreshment,
    mobility: formData.mobility,
    others: formData.others,
    status: "pending",
  });

  const onSaveSheet1Annex2 = async (formData) => {
    try {
      await firestore
        .collection("practices")
        .doc(practice.id)
        .collection("annexs")
        .doc("annex2")
        .update({ ...assignUpdateProps(mapForm(formData)) });

      notification({
        type: "success",
        title:
          "Felicidades por completar el anexo 2, ahora solo debes esperar la aprobación de un supervisor académico",
      });
    } catch (e) {
      console.log(e);
      notification({ type: "error" });
    }
  };

  const onConfirmSaveSheet1 = (practice) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: async () => await onSaveSheet1Annex2(practice),
    });

  return (
    <Sheet1
      practice={practice}
      user={user}
      annex2={annex2}
      onConfirmSaveSheet1={onConfirmSaveSheet1}
    />
  );
};

const Sheet1 = ({ practice, user, annex2, onConfirmSaveSheet1 }) => {
  const schema = yup.object({
    refreshment: yup.string().required(),
    mobility: yup.string().required(),
    others: yup.string(),
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
  }, [annex2]);

  const resetForm = () => {
    reset({
      refreshment: annex2?.refreshment || "",
      mobility: annex2?.mobility || "",
      others: annex2?.others || "",
    });
  };

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Form onSubmit={handleSubmit(onConfirmSaveSheet1)}>
            <Row gutter={[16, 16]}>
              {user.roleCode === "user" ? (
                <>
                  <Col span={24} md={8}>
                    <Controller
                      name="refreshment"
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value, name } }) => (
                        <Input
                          label="Refrigerio"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                          disabled={user.roleCode !== "user"}
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
                          label="Movilidad"
                          name={name}
                          value={value}
                          onChange={onChange}
                          error={error(name)}
                          required={required(name)}
                          disabled={user.roleCode !== "user"}
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
                          disabled={user.roleCode !== "user"}
                        />
                      )}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col span={24} md={8}>
                    <p>
                      <strong>Refrigerio</strong>
                    </p>
                    <p>{annex2?.refreshment || "-"}</p>
                  </Col>
                  <Col span={24} md={8}>
                    <p>
                      <strong>Movilidad</strong>
                    </p>
                    <p>{annex2?.mobility || "-"}</p>
                  </Col>
                  <Col span={24} md={8}>
                    <p>
                      <strong>Otros (opcional)</strong>
                    </p>
                    <p>{annex2?.others || "-"}</p>
                  </Col>
                </>
              )}
            </Row>
            <ObservationsList annex={annex2} practice={practice} />
            <Acl name="/practices/:practiceId/annex#save">
              {user?.roleCode === "user" && (
                <Row justify="end" gutter={[16, 16]}>
                  <Col span={24} sm={6} md={4}>
                    <Button type="primary" size="large" block htmlType="submit">
                      Guardar
                    </Button>
                  </Col>
                </Row>
              )}
            </Acl>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
