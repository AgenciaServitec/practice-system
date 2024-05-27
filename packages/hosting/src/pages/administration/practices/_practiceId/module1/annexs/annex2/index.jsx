import React from "react";
import { Title } from "../../../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import { Sheet1Integration } from "./Sheet1";
import { Space } from "antd";
import styled from "styled-components";

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
  return (
    <ContainerRow>
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
