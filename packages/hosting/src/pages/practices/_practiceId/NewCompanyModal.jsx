import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Col,
  ComponentContainer,
  Form,
  Input,
  Modal,
  notification,
  Row,
} from "../../../components";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDefaultFirestoreProps, useFormUtils } from "../../../hooks";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiCompanyDataByRucGet,
} from "../../../api";
import { Button, Space } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import {
  addCompany,
  fetchCompanyByRuc,
  getCompanyId,
} from "../../../firebase/collections/companies";
import { isEmpty } from "lodash";
import { mediaQuery } from "../../../styles";
import { lighten } from "polished";

export const NewCompanyModal = ({ visible, onClickVisibleModal }) => {
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState(null);

  const { assignCreateProps } = useDefaultFirestoreProps();

  const {
    getCompanyDataByRuc,
    getCompanyDataByRucResponse,
    getCompanyDataByRucLoading,
  } = useApiCompanyDataByRucGet();

  const schema = yup.object({
    companyRuc: yup.string().min(11).max(11).required(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error, errorMessage } = useFormUtils({ errors, schema });

  useEffect(() => {
    const rucFormData = watch("companyRuc") || "";
    const existsRuc = rucFormData.length === 11;
    if (existsRuc) {
      (async () => {
        try {
          const companies = await fetchCompanyByRuc(rucFormData);

          const company = companies?.[0];

          if (!isEmpty(company)) {
            notification({
              type: "warning",
              title: "¡La empresa ya esta registrada!",
            });
            return setCompany(null);
          }

          const _company = await getCompanyDataByRuc(rucFormData);
          if (!getCompanyDataByRucResponse.ok) {
            throw new Error(company);
          }

          setCompany(_company);
        } catch (e) {
          const errorResponse = await getApiErrorResponse(e);
          apiErrorNotification(errorResponse);
          setCompany(null);
          setValue("companyRuc", "");
        }
      })();
    }
  }, [watch("companyRuc")]);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);

      if (!company)
        return notification({
          type: "warning",
          title: "No existe la empresa",
        });

      await addCompany(
        assignCreateProps({
          ...company,
          id: getCompanyId(),
          ruc: formData.companyRuc,
          status: company?.status === "ACTIVO" ? "active" : "inactive",
        })
      );

      notification({
        type: "success",
        title: "Empresa agregado exitosamente",
      });
      resetData();
      onClickVisibleModal(false);
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  const resetData = () =>
    reset({
      companyRuc: "",
    });

  return (
    <ModalContainer
      title={
        <div>
          <h4 style={{ margin: "0", fontSize: "1.1em" }}>Registrar empresa</h4>
        </div>
      }
      closable
      closeModal={() => {
        return onClickVisibleModal();
      }}
      open={visible}
      onOk={() => onClickVisibleModal()}
      onCancel={() => {
        return onClickVisibleModal();
      }}
      footer={null}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Controller
              name="companyRuc"
              control={control}
              render={({ field: { onChange, value, name } }) => (
                <Input
                  label="RUC de empresa"
                  type="number"
                  onChange={onChange}
                  value={value}
                  name={name}
                  error={error(name)}
                  helperText={errorMessage(name)}
                  required={required(name)}
                  suffix={
                    getCompanyDataByRucLoading && (
                      <FontAwesomeIcon icon={faSpinner} spin />
                    )
                  }
                />
              )}
            />
          </Col>
          <Col span={24}>
            {company && watch("companyRuc").length === 11 && (
              <>
                <ComponentContainer.group label="Empresa">
                  <Space
                    wrap
                    style={{
                      display: "flex",
                      justifyContent: "start",
                      gap: "1.5em",
                    }}
                  >
                    <span>
                      Razón social: <h5>{company.socialReason}</h5>
                    </span>
                    <span>
                      RUC:
                      <h5>{company.ruc}</h5>
                    </span>
                  </Space>
                </ComponentContainer.group>
              </>
            )}
          </Col>
          <Col span={24}>
            <Button
              type="primary"
              disabled={loading || !company}
              block
              htmlType="submit"
            >
              Agregar
            </Button>
          </Col>
        </Row>
      </Form>
    </ModalContainer>
  );
};

const ModalContainer = styled(Modal)`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  width: 100%;
  height: auto;
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0;
  top: 0;
  z-index: 9999999 !important;

  ${mediaQuery.minTablet} {
    min-width: inherit;
    min-height: inherit;
    width: inherit;
    height: auto;
    top: 2vh;
  }

  .ant-modal-content {
    border-radius: 1.2em;
    background-color: ${({ theme }) => lighten(0.09, "#eee")};
    color: ${({ theme }) => theme.colors.font2};

    .ant-modal-header {
      background-color: inherit;

      .ant-modal-title {
        text-align: center;
        color: ${({ theme }) => theme.colors.font1};
        font-weight: 800;
        font-size: 1.3em;

        h2 {
          margin: 0;
        }
      }
    }

    .ant-modal-close {
      color: ${({ theme }) => theme.colors.font1};
    }

    .ant-modal-body {
      background-color: inherit;
    }

    .top-label {
      font-size: 0.9em;
      line-height: 1em;
      margin-bottom: 0.7em;
    }
  }
`;
