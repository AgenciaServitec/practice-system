import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Acl,
  Button,
  IconAction,
  modalConfirm,
  notification,
  Title,
} from "../../../components";
import { InitialPracticeFormIntegration } from "./InitialForm";
import {
  addPractice,
  getPracticesId,
  practicesRef,
  updatePractice,
  updateUser,
} from "../../../firebase/collections";
import { useNavigate, useParams } from "react-router";
import { useAuthentication, useGlobalData } from "../../../providers";
import { useDefaultFirestoreProps } from "../../../hooks";
import { Card, Collapse, Tag } from "antd";
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
import { practicesStatus } from "../../../data-list";
import { querySnapshotToArray } from "../../../firebase/firestore";
import { AnnexStatus } from "./AnnexStatus";

export const PracticeIntegration = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams();
  const { authUser } = useAuthentication();
  const { assignCreateProps, assignUpdateProps } = useDefaultFirestoreProps();
  const { practices, users, companies } = useGlobalData();

  const [practice, setPractice] = useState({});
  const [practitioner, setPractitioner] = useState({});
  const [representativeCompany, setRepresentativeCompany] = useState({});
  const [supervisor, setSupervisor] = useState({});
  const [company, setCompany] = useState({});
  const [annexs, setAnnexs] = useState([]);

  const isNew = practiceId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    const _practice = isNew
      ? { id: getPracticesId() }
      : practices.find((practice) => practice.id === practiceId);

    if (!_practice) return onGoBack();

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
    setCompany(_company);
    setPractitioner(
      users.find((user) => user?.id === _practice.practitionerId)
    );
    setRepresentativeCompany(
      users.find((user) => user?.id === _company.representativeId)
    );
    setSupervisor(
      users.find((user) => user?.id === _practice.academicSupervisorId)
    );
  }, [practiceId]);

  const savePractice = async (practice) => {
    await updateUser(
      practice.practitionerId,
      assignUpdateProps({ hasPractices: true })
    );

    if (isNew) {
      ["annex2", "annex3", "annex4", "annex6"].forEach((annex) => {
        practicesRef.doc(practice.id).collection("annexs").doc(annex).set({
          id: annex,
          status: "pending",
        });
      });

      await addPractice(assignCreateProps(practice));
      onGoBack();
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

  const AnnexTitle = ({ title, status }) => (
    <div>
      <Title level={4}>{title} </Title>
      <Tag
        icon={<FontAwesomeIcon size="lg" icon={status?.icon} />}
        color={status?.type}
      >
        {" "}
        {status?.value}
      </Tag>
    </div>
  );

  const getItems = () => [
    {
      key: "annex2",
      label: (
        <Col span={24}>
          <div className="header-annex">
            <AnnexTitle
              title="Anexo 2"
              status={practicesStatus?.[annex2?.status]}
            />
            <AnnexStatus annex={annex2} />
          </div>
        </Col>
      ),
      children: (
        <Annex2Integration
          practice={practice}
          user={authUser}
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
          <div className="header-annex">
            <AnnexTitle
              title="Anexo 3"
              status={practicesStatus?.[annex3?.status]}
            />
            <AnnexStatus annex={annex3} />
          </div>
        </Col>
      ),
      children: (
        <Annex3Integration
          practice={practice}
          annex3={annex3}
          user={authUser}
        />
      ),
      style: panelStyle,
    },
    {
      key: "annex4",
      label: (
        <Col span={24}>
          <div className="header-annex">
            <AnnexTitle
              title="Anexo 4"
              status={practicesStatus?.[annex4?.status]}
            />
            <AnnexStatus annex={annex4} />
          </div>
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
          <div className="header-annex">
            <AnnexTitle
              title="Anexo 6"
              status={practicesStatus?.[annex6?.status]}
            />
            <AnnexStatus annex={annex6} />
          </div>
        </Col>
      ),
      children: (
        <Annex6Integration
          practice={practice}
          user={authUser}
          users={users}
          practitioner={practitioner}
          representativeCompany={representativeCompany}
          supervisor={supervisor}
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
            <Acl name="/practices/:practiceId/module#approved">
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
            </Acl>
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
  .header-annex {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    flex-wrap: wrap;
  }
`;
