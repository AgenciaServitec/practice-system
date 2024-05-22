import React from "react";
import { Title } from "../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";

export const Anexo2Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
  onSavePractice,
}) => {
  return (
    <Anexo2
      practice={practice}
      user={user}
      users={users}
      practitioner={practitioner}
      company={company}
      onSavePractice={onSavePractice}
    />
  );
};

const Anexo2 = ({
  practice,
  user,
  users,
  practitioner,
  company,
  onSavePractice,
}) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Space direction="vertical">
          <Title level={4}>Hoja 1</Title>
          <Sheet1Integration
            practice={practice}
            user={user}
            users={users}
            practitioner={practitioner}
            company={company}
            onSavePractice={onSavePractice}
          />
        </Space>
      </Col>
    </Row>
  );
};
