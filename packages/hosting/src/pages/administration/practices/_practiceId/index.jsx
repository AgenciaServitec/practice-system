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
import { Card, Collapse } from "antd";
import {
  faArrowLeft,
  faFilePdf,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Annex2Integration,
  Annex3Integration,
  Annex4Integration,
  Annex6Integration,
} from "./module1";
import styled from "styled-components";
import { practicesStatus } from "../../../../data-list";
import { querySnapshotToArray } from "../../../../firebase/firestore";

export const PracticeIntegration = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams();
  const { authUser } = useAuthentication();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { practices, users, companies } = useGlobalData();

  const [practice, setPractice] = useState({});
  const [practitioner, setPractitioner] = useState({});
  const [company, setCompany] = useState({});
  const [annexs, setAnnexs] = useState([]);

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

    (async () => {
      await practicesRef
        .doc(_practice?.id)
        .collection("annexs")
        .onSnapshot((snapshot) => {
          setAnnexs(querySnapshotToArray(snapshot));
        });
    })();

    setPractice(_practice);
    setPractitioner(_practitioner);
    setCompany(_company);
  }, [practiceId]);

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

  const onConfirmModuleApproved = (practice) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres aprobar el modulo completo?",
      onOk: async () => {
        await updatePractice(practice.id, { status: "approved" });
        notification({ type: "success" });
      },
    });

  const [annex2, annex3, annex4, annex6] = annexs;

  const getItems = () => [
    {
      key: "annex2",
      label: (
        <Col span={24}>
          <Title level={4}>
            Anexo 2{" "}
            <FontAwesomeIcon
              icon={practicesStatus?.[annex2?.status]?.icon}
              color={practicesStatus?.[annex2?.status]?.color}
            />
          </Title>
        </Col>
      ),
      children: (
        <Annex2Integration
          practice={practice}
          practitioner={practitioner}
          company={company}
          annex2={annex2}
        />
      ),
      style: panelStyle,
    },
    {
      key: "annex3",
      label: (
        <Col span={24}>
          <Title level={4}>
            Anexo 3{" "}
            <FontAwesomeIcon
              icon={practicesStatus?.[annex3?.status]?.icon}
              color={practicesStatus?.[annex3?.status]?.color}
            />
          </Title>
        </Col>
      ),
      children: <Annex3Integration practice={practice} annex3={annex3} />,
      style: panelStyle,
    },
    {
      key: "annex4",
      label: (
        <Col span={24}>
          <Title level={4}>
            Anexo 4{" "}
            <FontAwesomeIcon
              icon={practicesStatus?.[annex4?.status]?.icon}
              color={practicesStatus?.[annex4?.status]?.color}
            />
          </Title>
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
          annex4={annex4}
        />
      ),
      style: panelStyle,
    },
    {
      key: "annex6",
      label: (
        <Col span={24}>
          <Title level={4}>
            Anexo 6{" "}
            <FontAwesomeIcon
              icon={practicesStatus?.[annex6?.status]?.icon}
              color={practicesStatus?.[annex6?.status]?.color}
            />
          </Title>
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
          annex6={annex6}
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
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="header-wrapper">
            <IconAction
              icon={faArrowLeft}
              styled={{ color: (theme) => theme.colors.primary }}
              onClick={() => navigate("/practices")}
            />
            <Title level={3} style={{ margin: "0" }}>
              <span className="capitalize">
                {!isNew
                  ? `Modulo ${practice.moduleNumber}: ${practice.name}`
                  : "Registro de Prácticas Pre-Profesionales"}
              </span>
            </Title>
            {isNew ? (
              <div />
            ) : (
              <IconAction
                icon={faFilePdf}
                styled={{ color: (theme) => theme.colors.error }}
                onClick={() =>
                  navigate(`/practices/${practice.id}/module1/sheets`)
                }
                tooltipTitle="Ver pdf"
              />
            )}
          </div>
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
    </Container>
  );
};

const Container = styled.div`
  .capitalize {
    text-transform: capitalize;
  }

  .header-wrapper {
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 0.5em;
  }
`;
