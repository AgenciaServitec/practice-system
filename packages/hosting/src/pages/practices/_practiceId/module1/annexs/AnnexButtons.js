import React from "react";
import { Acl, Button } from "../../../../../components";
import Col from "antd/lib/col";
import Row from "antd/lib/row";

export const AnnexButtons = ({
  hasPermissions = false,
  practice,
  onSetVisibleForm = undefined,
  onRefusedAnnex,
  onApprovedAnnex,
}) => {
  if (practice.status === "approved" || !hasPermissions) return null;

  return (
    <Row
      justify="center"
      gutter={[16, 16]}
      style={{ width: "100%", padding: "2em 1em" }}
    >
      {onSetVisibleForm && (
        <Acl name="/practices/:practiceId/annex#observation">
          <Col span={24} sm={6} md={6}>
            <Button size="large" block onClick={() => onSetVisibleForm(true)}>
              Observación
            </Button>
          </Col>
        </Acl>
      )}
      <Acl name="/practices/:practiceId/annex#refused">
        <Col span={24} sm={6} md={6}>
          <Button
            type="primary"
            danger
            size="large"
            block
            onClick={() => onRefusedAnnex(practice)}
          >
            Rechazar Anexo
          </Button>
        </Col>
      </Acl>
      <Acl name="/practices/:practiceId/annex#approved">
        <Col span={24} sm={6} md={6}>
          <Button
            type="primary"
            size="large"
            block
            onClick={() => onApprovedAnnex(practice)}
          >
            Aprobar Anexo
          </Button>
        </Col>
      </Acl>
    </Row>
  );
};
