import React from "react";
import { Title } from "../../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";
import styled from "styled-components";
import { Sheet2Integration } from "./Sheet2";
import { Sheet3Integration } from "./Sheet3";

export const Annex6Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
  annex6,
  onSavePractice,
}) => {
  return (
    <ContainerRow gutter={[16, 16]}>
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
              annex6={annex6}
              onSavePractice={onSavePractice}
            />
          </Space>
        </div>
      </Col>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical">
            <Title level={4}>Hoja 2</Title>
            <Sheet2Integration
              practice={practice}
              user={user}
              users={users}
              practitioner={practitioner}
              company={company}
              onSavePractice={onSavePractice}
            />
          </Space>
        </div>
      </Col>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical">
            <Title level={4}>Hoja 3</Title>
            <Sheet3Integration
              practice={practice}
              user={user}
              users={users}
              practitioner={practitioner}
              company={company}
              onSavePractice={onSavePractice}
            />
          </Space>
        </div>
      </Col>
    </ContainerRow>
  );
};

const ContainerRow = styled(Row)`
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
