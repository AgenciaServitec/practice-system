import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Button,
  IconAction,
  modalConfirm,
  notification,
  Title,
} from "../../../../components";
import { InitialPracticeFormIntegration } from "./InitialForm";
import {
  addPractice,
  getPracticesId,
  practicesRef,
  updatePractice,
} from "../../../../firebase/collections";
import { useNavigate, useParams } from "react-router";
import { useAuthentication, useGlobalData } from "../../../../providers";
import { useDefaultFirestoreProps } from "../../../../hooks";
import { Card, Collapse, Space } from "antd";
import {
  faArrowLeft,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { capitalize } from "lodash";
import {
  Annex2Integration,
  Annex3Integration,
  Annex4Integration,
  Annex6Integration,
} from "./annexs";

export const PracticeIntegration = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams();
  const { authUser } = useAuthentication();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { practices, users, companies } = useGlobalData();
  const [practice, setPractice] = useState({});
  const [practitioner, setPractitioner] = useState({});
  const [company, setCompany] = useState({});

  const isNew = practiceId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    const _practice = isNew
      ? { id: getPracticesId() }
      : practices.find((practice) => practice.id === practiceId);

    if (!_practice) return onGoBack();

    const _practitioner = users.find(
      (user) => user.id === _practice.practitionerId
    );

    const _company = companies.find(
      (company) => company.id === _practice.companyId
    );

    setPractice(_practice);
    setPractitioner(_practitioner);
    setCompany(_company);
  }, []);

  const savePractice = async (practice) => {
    if (isNew) {
      ["annex2", "annex3", "annex4", "annex6"].forEach((annex) => {
        practicesRef.doc(practice.id).collection("annexs").doc(annex).set({
          id: annex,
        });
      });

      await addPractice(assignCreateProps(practice));
      return;
    }

    await updatePractice(practice.id, assignUpdateProps(practice));
  };

  const onConfirmModuleApproved = () =>
    modalConfirm({
      title: "¿Estás seguro de que quieres aprobar el modulo completo?",
      onOk: () => notification({ type: "success" }),
    });

  const getItems = () => [
    {
      key: "annex2",
      label: (
        <Col span={24}>
          <Title level={4}>Anexo 2</Title>
        </Col>
      ),
      children: (
        <Annex2Integration
          practice={practice}
          user={authUser}
          users={users}
          practitioner={practitioner}
          company={company}
          onSavePractice={savePractice}
        />
      ),
      style: panelStyle,
    },
    {
      key: "annex3",
      label: (
        <Col span={24}>
          <Title level={4}>Anexo 3</Title>
        </Col>
      ),
      children: (
        <Annex3Integration
          practice={practice}
          user={authUser}
          users={users}
          practitioner={practitioner}
          company={company}
          onSavePractice={savePractice}
        />
      ),
      style: panelStyle,
    },
    {
      key: "annex4",
      label: (
        <Col span={24}>
          <Title level={4}>Anexo 4</Title>
        </Col>
      ),
      children: (
        <Annex4Integration
          practice={practice}
          user={authUser}
          users={users}
          practitioner={practitioner}
          company={company}
          onSavePractice={savePractice}
        />
      ),
      style: panelStyle,
    },
    {
      key: "annex6",
      label: (
        <Col span={24}>
          <Title level={4}>Anexo 6</Title>
        </Col>
      ),
      children: (
        <Annex6Integration
          practice={practice}
          user={authUser}
          users={users}
          practitioner={practitioner}
          company={company}
          onSavePractice={savePractice}
        />
      ),
      style: panelStyle,
    },
  ];

  const panelStyle = {
    background: "rgba(0, 0, 0, 0.02)",
    marginBottom: "1em",
    borderRadius: "1em",
    border: "none",
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Space>
            <IconAction
              icon={faArrowLeft}
              styled={{ color: (theme) => theme.colors.primary }}
              onClick={() => onGoBack()}
            />
            <Title level={3}>
              {!isNew
                ? `Modulo ${practice.moduleNumber}: ${capitalize(
                    practice.name
                  )}`
                : "Registro de Prácticas Pre-Profesionales"}
            </Title>
          </Space>
        </Col>
        <Col>
          <InitialPracticeFormIntegration
            isNew={isNew}
            practice={practice}
            users={users}
            user={authUser}
            practitioner={practitioner}
            companies={companies}
            company={company}
            onSavePractice={savePractice}
          />
        </Col>
      </Row>
      <br />
      {!isNew && (
        <>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Anexos">
                <Collapse
                  defaultActiveKey={["1"]}
                  bordered={false}
                  expandIconPosition="end"
                  accordion
                  size="large"
                  expandIcon={({ isActive }) => (
                    <FontAwesomeIcon
                      icon={isActive ? faMinus : faPlus}
                      style={{ fontSize: "1.2em" }}
                    />
                  )}
                  items={getItems(panelStyle)}
                  style={{
                    background: "transparent",
                  }}
                />
              </Card>
            </Col>
          </Row>
          <br />
          <Row justify="end" gutter={[16, 16]}>
            <Col span={24} sm={12} md={10} lg={8}>
              <Button
                type="primary"
                danger
                size="large"
                block
                onClick={() => onConfirmModuleApproved()}
              >
                Aprobar el modulo completo
              </Button>
            </Col>
            <Col span={24} sm={12} md={10} lg={5}>
              <Button type="primary" size="large" block htmlType="submit">
                Modulo revisado
              </Button>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
