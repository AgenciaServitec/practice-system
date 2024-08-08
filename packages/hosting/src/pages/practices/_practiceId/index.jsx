import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import {
  Acl,
  Button,
  IconAction,
  modalConfirm,
  notification,
  Spinner,
  Title,
} from "../../../components";
import {
  fetchPractice,
  getPracticesId,
  updatePractice,
  updateUser,
} from "../../../firebase/collections";
import { useNavigate, useParams } from "react-router";
import { useAuthentication, useGlobalData } from "../../../providers";
import {
  useDefaultFirestoreProps,
  useGetAllDataByPractice,
} from "../../../hooks";
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
import { AnnexStatus } from "./AnnexStatus";
import { ManageCreateProductIntegration } from "./ManageCreatePractice";
import { InitialInformation } from "./InitialInformation";

export const PracticeIntegration = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams();
  const { authUser } = useAuthentication();
  const { assignUpdateProps } = useDefaultFirestoreProps();
  const { users, companies } = useGlobalData();

  const [practice, setPractice] = useState({});
  const { annexs, company, practitioner, representativeCompany, supervisor } =
    useGetAllDataByPractice(practice);
  const [loading, setLoading] = useState(false);

  const isNew = practiceId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (async () => await initialFetch())();
  }, [practiceId]);

  const initialFetch = async () => {
    try {
      setLoading(true);

      const _practice = isNew
        ? { id: getPracticesId() }
        : await fetchPractice(practiceId);

      if (!_practice) return onGoBack();

      setPractice(_practice);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const savePractice = async (practice) => {
    const p0 = updateUser(
      practice.practitionerId,
      assignUpdateProps({ hasPractices: true })
    );

    const p1 = updatePractice(practice.id, assignUpdateProps(practice));

    await Promise.all([p0, p1]);
  };

  const onConfirmModuleApproved = () =>
    modalConfirm({
      title: "¿Estás seguro de que quieres aprobar el modulo completo?",
      onOk: async () => {
        await updatePractice(practice.id, { status: "approved" });
        notification({ type: "success" });
      },
    });

  if (loading) return <Spinner height="100vmin" />;

  const [annex2 = {}, annex3 = {}, annex4 = {}, annex6 = {}] = annexs;

  const isValidToApprovedAllModule =
    annex2?.status === "approved" &&
    annex3?.status === "approved" &&
    annex4?.status === "approved" &&
    annex6?.status === "approved";

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

  const annexsList = () => [
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
          representativeCompany={representativeCompany}
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
      {isNew ? (
        <ManageCreateProductIntegration
          practice={practice}
          users={users}
          user={authUser}
          practitioner={practitioner}
          companies={companies}
          company={company}
          onGoBack={onGoBack}
        />
      ) : (
        <>
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
                    Modulo {practice?.moduleNumber}: {practice?.name}
                  </span>
                </Title>
                <IconAction
                  icon={faFilePdf}
                  styled={{ color: (theme) => theme.colors.error }}
                  onClick={() =>
                    navigate(`/practices/${practice.id}/module1/sheets`)
                  }
                  tooltipTitle="Ver pdf"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InitialInformation
                practice={practice}
                users={users}
                user={authUser}
                companies={companies}
                company={company}
                practitioner={practitioner}
                supervisor={supervisor}
                representativeCompany={representativeCompany}
              />
            </Col>
          </Row>
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
                  items={annexsList(panelStyle)}
                  style={{
                    background: "transparent",
                  }}
                />
              </Card>
            </Col>
          </Row>
          <br />
          {isValidToApprovedAllModule && (
            <Row justify="end" gutter={[16, 16]} style={{ padding: "2em 0" }}>
              <Acl name="/practices/:practiceId/module#approved">
                <Col span={24}>
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
          )}
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
