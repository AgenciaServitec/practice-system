import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Col, Form, notification, Row, Upload } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { useFormUtils } from "../../hooks";
import { useAuthentication } from "../../providers";
import { assign } from "lodash";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiUserPut,
} from "../../api";
import { v4 as uuidv4 } from "uuid";

export const ProfileImagesForm = () => {
  const { authUser } = useAuthentication();
  const { putUser, putUserLoading, putUserResponse } = useApiUserPut();

  const schema = yup.object({
    frontDniPhoto: yup.mixed(),
    backDniPhoto: yup.mixed(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { error, required } = useFormUtils({ errors, schema });

  const updateProfile = async (formData) => {
    try {
      const response = await putUser(
        assign({}, formData, {
          id: authUser.id,
          phone: authUser.phone,
          email: authUser.email,
          frontDniPhoto: formData?.frontDniPhoto || null,
          backDniPhoto: formData?.backDniPhoto || null,
        })
      );

      if (!putUserResponse.ok) {
        throw new Error(response);
      }

      notification({ type: "success" });
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };

  const resetForm = () => {
    reset({
      frontDniPhoto: authUser?.frontDniPhoto || null,
      backDniPhoto: authUser?.backDniPhoto || null,
    });
  };

  useEffect(() => {
    resetForm();
  }, [authUser]);

  const onSubmit = async (formData) => await updateProfile(formData);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row justify="end" gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12}>
          <Controller
            control={control}
            name="frontDniPhoto"
            render={({ field: { onChange, value, onBlur, name } }) => (
              <Upload
                isImage
                label="Foto de DNI (anverso):"
                buttonText="Subir foto"
                withThumbImage={false}
                value={value}
                name={name}
                fileName={`front-dni-foto-${uuidv4()}`}
                filePath={`users/${authUser.id}/documents`}
                onChange={(file) => onChange(file)}
                required={required(name)}
                error={error(name)}
              />
            )}
          />
        </Col>
        <Col xs={24} sm={12} md={12}>
          <Controller
            control={control}
            name="backDniPhoto"
            render={({ field: { onChange, value, onBlur, name } }) => (
              <Upload
                isImage
                label="Foto de DNI (reverso):"
                accept="image/*"
                buttonText="Subir foto"
                withThumbImage={false}
                value={value}
                name={name}
                fileName={`back-dni-foto-${uuidv4()}`}
                filePath={`users/${authUser.id}/documents`}
                onChange={(file) => onChange(file)}
                required={required(name)}
                error={error(name)}
              />
            )}
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            loading={putUserLoading}
          >
            Guardar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
