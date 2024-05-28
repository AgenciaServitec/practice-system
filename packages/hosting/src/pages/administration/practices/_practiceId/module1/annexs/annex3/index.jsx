import React from "react";
import {
  Button,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";
import styled from "styled-components";
import { practicesRef } from "../../../../../../../firebase/collections";

export const Annex3Integration = ({ practice, annex3 }) => {
  const onApprovedAnnex3 = async (practice) => {
    modalConfirm({
      title: "Seguro que deseas aprovar el anexo 3?",
      content: "El anexo 3 pasara al estado de aprobado",
      onOk: async () => {
        await practicesRef
          .doc(practice.id)
          .collection("annexs")
          .doc("annex3")
          .update({ status: "approved" });

        notification({ type: "success" });
      },
    });
  };

  const onRefusedAnnex3 = async (practice) => {
    modalConfirm({
      title: "Seguro que deseas rechazar el anexo 3?",
      content: "El anexo 3 pasara al estado de rechazado",
      onOk: async () => {
        await practicesRef
          .doc(practice.id)
          .collection("annexs")
          .doc("annex3")
          .update({ status: "refused" });

        notification({ type: "success" });
      },
    });
  };

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="item-sheet">
            <Space direction="vertical">
              <Title level={4}>Hoja 1</Title>
              <Sheet1Integration practice={practice} annex3={annex3} />
            </Space>
          </div>
        </Col>
      </Row>
      <br />
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24} sm={6} md={6}>
          <Button
            type="primary"
            danger
            size="large"
            block
            onClick={() => onRefusedAnnex3(practice)}
          >
            Rechazar Anexo 3
          </Button>
        </Col>
        <Col span={24} sm={6} md={6}>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => onApprovedAnnex3(practice)}
          >
            Aprobar Anexo 3
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  .item-sheet {
    width: 100%;
    background: #f1f0f0;
    padding: 1em;
    border-radius: 1em;
  }

  .ant-space-item {
    width: 100%;
  }
`;
