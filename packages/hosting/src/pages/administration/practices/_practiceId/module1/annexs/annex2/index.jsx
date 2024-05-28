import React from "react";
import { Button, modalConfirm, Title } from "../../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";
import styled from "styled-components";
import { updatePractice } from "../../../../../../../firebase/collections";

export const Annex2Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
}) => {
  return (
    <Annex2
      practice={practice}
      user={user}
      users={users}
      practitioner={practitioner}
      company={company}
    />
  );
};

const Annex2 = ({ practice, user, users, practitioner, company }) => {
  const onApprovedAnnex2 = async (practice) => {
    modalConfirm({
      content: "Seguro que deseas aprovar el anexo2 ?",
      onOk: async () => {
        await updatePractice(practice.id, { status: "approved" });
      },
    });
  };

  return (
    <Container>
      <Row>
        <Col span={24}>
          <div className="item-sheet">
            <Space direction="vertical">
              <Title level={4}>Hoja 1</Title>
              <Sheet1Integration
                practice={practice}
                user={user}
                users={users}
                practitioner={practitioner}
                company={company}
              />
            </Space>
          </div>
        </Col>
      </Row>
      <br />
      <Row justify="end" gutter={[16, 16]}>
        <Col span={24} sm={6} md={4}>
          <Button
            type="primary"
            danger
            size="large"
            block
            onClick={() => onApprovedAnnex2(practice)}
          >
            Aprobar Anexo 2
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
