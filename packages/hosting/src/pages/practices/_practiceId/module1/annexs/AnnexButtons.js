import React from "react";
import { Acl, Button, Row, Col, Alert } from "../../../../../components";
import { Link } from "react-router-dom";

export const AnnexButtons = ({
  annexName = "annex2",
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
      <Col span={24}>
        <Alert
          type="info"
          showIcon
          message={
            <>
              Antes de aprobar el anexo, puede revisar todas las hojas haciendo{" "}
              <Link
                to={`/practices/${practice.id}/module1/sheets#${annexName}`}
              >
                Click Aquí!
              </Link>
            </>
          }
        />
      </Col>
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
