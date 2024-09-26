import React, { useEffect, useState } from "react";
import { Col, Modal, Row, Steps } from "../../components";
import { fetchAnnexs } from "../../firebase/collections";

export const PracticeLogsModal = ({ open, onCancel, practice }) => {
  const [annexs, setAnnexs] = useState([]);

  useEffect(() => {
    (async () => {
      const _annexs = await fetchAnnexs(practice.id);
      setAnnexs(_annexs);
    })();
  }, []);

  const [annex2, annex3, annex4, annex6] = annexs;

  const isRegister = practice?.status === "pending";
  const isAnnex2Approved = annex2?.status === "approved";
  const isAnnex3Approved = annex3?.status === "approved";
  const isAnnex4Approved = annex4?.status === "approved";
  const isAnnex6Approved = annex6?.status === "approved";
  const isPracticeApproved = practice?.status === "approved";

  return (
    <Modal
      title="Proceso de la Práctica"
      open={open}
      closable
      onCancel={onCancel}
    >
      <Row justify="center">
        <Col span={10}>
          <Steps
            direction="vertical"
            current={1}
            items={[
              {
                title: "Registro",
              },
              {
                title: "Anexo 2",
              },
              {
                title: "Anexo 3",
              },
              {
                title: "Anexo 4",
              },
              {
                title: "Anexo 6",
              },
              {
                title: "Completado",
              },
            ]}
          />
        </Col>
      </Row>
    </Modal>
  );
};
