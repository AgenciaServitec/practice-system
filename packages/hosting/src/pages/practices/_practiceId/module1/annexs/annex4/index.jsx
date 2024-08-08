import React from "react";
import { Title } from "../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Space } from "antd";
import styled from "styled-components";
import { Sheet1Integration } from "./Sheet1";

export const Annex4Integration = ({
  practice,
  user,
  users,
  practitioner,
  company,
  annex4,
  onSavePractice,
}) => {
  return (
    <ContainerRow gutter={[16, 16]}>
      <Col span={24}>
        <div className="item-sheet">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={4}>Hoja de Evaluación</Title>
            <Sheet1Integration
              practice={practice}
              user={user}
              users={users}
              practitioner={practitioner}
              company={company}
              annex4={annex4}
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
