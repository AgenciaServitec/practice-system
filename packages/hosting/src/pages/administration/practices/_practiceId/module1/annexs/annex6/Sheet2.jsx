import React from "react";
import styled from "styled-components";
import {
  Button,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { fullName } from "../../../../../../../utils";
import { BusinessPosition } from "../../../../../../../data-list";
export const Sheet2Integration = ({
  company,
  representativeCompany,
  supervisor,
}) => {
  const onConfirmSheet2 = () =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: () => notification({ type: "success" }),
    });

  return (
    <Sheet1
      onConfirmSheet2={onConfirmSheet2}
      company={company}
      representativeCompany={representativeCompany}
      supervisor={supervisor}
    />
  );
};

const Sheet1 = ({
  onConfirmSheet2,
  company,
  representativeCompany,
  supervisor,
}) => {
  const BusinessPositionValue = BusinessPosition.find(
    (position) =>
      position.value ===
      representativeCompany?.companyRepresentativeData?.businessPosition
  )?.label;

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>II. DATOS DE LA EMPRESA:</Title>
        </Col>
        <Col span={24} md={12}>
          <label>Razón Social de la Empresa o Centro de Prácticas: </label>
          <p>{company?.socialReason || "-"}</p>
        </Col>
        <Col span={24} md={12}>
          <label>Dirección: </label>
          <p>{company?.address || "-"}</p>
        </Col>
        <Col span={24} md={6}>
          <label>Distrito: </label>
          <p>{company?.district || "-"}</p>
        </Col>
        <Col span={24} md={6}>
          <label>Ciudad:</label>
          <p>{company?.province || "-"}</p>
        </Col>
        <Col span={24} md={6}>
          <label>Región:</label>
          <p>{company?.region || "-"}</p>
        </Col>
        <Col span={24} md={6}>
          <label>Teléfono:</label>
          <p>
            {`${representativeCompany.phone.prefix} ${representativeCompany.phone.number}` ||
              "-"}
          </p>
        </Col>
        <Col span={24} md={8}>
          <label>Correo Electrónico:</label>
          <p>{company?.email || "-"}</p>
        </Col>
        <Col span={24} md={8}>
          <label>Página Web:</label>
          <p>{company?.webSite || "-"}</p>
        </Col>
        <Col span={24} md={8}>
          <label>RUC:</label>
          <p>{company?.ruc || "-"}</p>
        </Col>
        <Col span={24} md={12}>
          <label>
            Nombre y Apellidos del Jefe o Autoridad Principal de la Empresa:
          </label>
          <p>{fullName(representativeCompany) || "-"}</p>
        </Col>
        <Col span={24} md={12}>
          <label>Cargo de la Autoridad Principal de la Empresa:</label>
          <p>{BusinessPositionValue || "-"}</p>
        </Col>
        <Col span={24} md={12}>
          <label>
            Cargo del Jefe o Supervisor de Práctica Pre-Profesional designado
            por la empresa:
          </label>
          <p>{BusinessPositionValue || "-"}</p>
        </Col>
        <Col span={24} md={12}>
          <label>
            Nombres y Apellidos del Docente Supervisor designado por el IESTP:
          </label>
          <p>{fullName(supervisor) || "-"}</p>
        </Col>
        <Col span={24} md={6}>
          <label>Rubro y/o Actividad que realiza la empresa:</label>
          <p>{company?.category || "-"}</p>
        </Col>
      </Row>
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24} sm={6} md={4}>
          <Button
            type="primary"
            danger
            size="large"
            block
            onClick={() => onConfirmSheet2()}
          >
            Aprobar
          </Button>
        </Col>
        <Col span={24} sm={6} md={4}>
          <Button type="primary" size="large" block htmlType="submit">
            Guardar
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  div {
    p:last-child {
      font-weight: 500;
      text-transform: capitalize;
      font-size: 1.1em;
      margin: 0;
    }
  }
`;
