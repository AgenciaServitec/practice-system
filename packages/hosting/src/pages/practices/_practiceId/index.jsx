import React, { useEffect, useState } from "react";
import {
  Acl,
  Alert,
  Button,
  Col,
  Collapse,
  IconAction,
  modalConfirm,
  notification,
  ObservationsList,
  Row,
  Spinner,
  Tag,
  Title,
} from "../../../components";
import {
  getPracticesId,
  practicesRef,
  updatePractice,
} from "../../../firebase/collections";
import { useNavigate, useParams } from "react-router";
import { useAuthentication, useGlobalData } from "../../../providers";
import {
  useDefaultFirestoreProps,
  useDevice,
  useGetAllDataByPractice,
} from "../../../hooks";
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
} from "./module";
import styled from "styled-components";
import { practicesStatus } from "../../../data-list";
import { AnnexStatus } from "./AnnexStatus";
import { ManageCreateProductIntegration } from "./ManageCreatePractice";
import { InitialInformation } from "./InitialInformation";
import { isEmpty } from "lodash";
import { ObservationOfPracticeModal } from "./ObservationOfPracticeModal";
import { mediaQuery } from "../../../styles";

export const PracticeIntegration = () => {
  const navigate = useNavigate();
  const { practiceId } = useParams();
  const { authUser } = useAuthentication();
  const { assignUpdateProps } = useDefaultFirestoreProps();
  const { users, companies } = useGlobalData();
  const { isMobile } = useDevice();

  const [practice, setPractice] = useState({});
  const { annexs, company, practitioner, representativeCompany, supervisor } =
    useGetAllDataByPractice(practice);
  const [loading, setLoading] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

  const isNew = practiceId === "new";
  const onGoBack = () => navigate(-1);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        isNew
          ? setPractice({ id: getPracticesId() })
          : await practicesRef
              .doc(practiceId)
              .onSnapshot((snapshot) => setPractice(snapshot.data()));

        if (!practice) return onGoBack();
      } catch (e) {
        onGoBack();
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [practice?.status]);

  useEffect(() => {
    (async () => {
      if (
        practice?.status === "approved" ||
        isEmpty(practice) ||
        isEmpty(annexs)
      )
        return;

      const annexsCount = (annexs || []).filter(
        (annex) => annex.status === "refused"
      ).length;

      if (annexsCount >= 4) {
        await updatePractice(
          practice.id,
          assignUpdateProps({ status: "refused" })
        );
      } else {
        await updatePractice(
          practice.id,
          assignUpdateProps({ status: "pending" })
        );
      }
    })();
  }, []);

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

  const observations = [
    ...(annex2?.observationsAcademicSupervisor || []),
    ...(annex2?.observationsCompanyRepresentative || []),
    ...(practice?.observations || []),
  ];

  const isObservationsEmpty =
    isEmpty(practice?.observations) &&
    isEmpty(annex2?.observationsAcademicSupervisor) &&
    isEmpty(annex2?.observationsCompanyRepresentative) &&
    isEmpty(annex3?.observationsAcademicSupervisor) &&
    isEmpty(annex3?.observationsCompanyRepresentative);

  const isExistsObservations = (observations || []).some(
    (observation) => observation?.status === "pending"
  );

  const isValidToApprovedAllModule =
    annex2?.status === "approved" &&
    annex3?.status === "approved" &&
    annex4?.status === "approved" &&
    annex6?.status === "approved" &&
    practice?.status !== "approved" &&
    authUser.roleCode === "academic_supervisor" &&
    (isObservationsEmpty || !isExistsObservations);

  const isCompanyRepresentative =
    authUser.roleCode === "company_representative";
  const isAcademicSupervisor = authUser.roleCode === "academic_supervisor";

  const AnnexTitle = ({ title, status }) => (
    <div>
      <Title level={isMobile ? 5 : 4}>{title} </Title>
      <Tag
        icon={<FontAwesomeIcon size="lg" icon={status?.icon} />}
        color={status?.type}
      >
        {" "}
        {status?.name}
      </Tag>
    </div>
  );

  const isExistsAcademicSupervisorAndCoordinatorInPractice =
    !isEmpty(practice?.academicSupervisorId) &&
    !isEmpty(practice?.academicCoordinatorId);

  const isApprovedAnnex = (status) => status === "approved";
  const hasPermissions = isCompanyRepresentative || isAcademicSupervisor;

  const annexsList = () => [
    {
      key: "annex2",
      label: (
        <Col span={24}>
          {annex2 && (
            <div className="header-annex">
              <AnnexTitle
                title="Anexo 2"
                status={practicesStatus?.[annex2?.status]}
              />
              <AnnexStatus annex={annex2} />
            </div>
          )}
        </Col>
      ),
      children: !isApprovedAnnex(annex2.status) && (
        <Annex2Integration
          practice={practice}
          user={authUser}
          practitioner={practitioner}
          representativeCompany={representativeCompany}
          company={company}
          annex2={annex2}
        />
      ),
      style: {
        ...panelStyle,
        background: isApprovedAnnex(annex2?.status)
          ? "#ecffc2"
          : "rgba(0, 0, 0, 0.03)",
      },
      collapsible: isApprovedAnnex(annex2?.status) ? "disabled" : "visible",
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
      children: !isApprovedAnnex(annex3?.status) && (
        <Annex3Integration
          practice={practice}
          annex3={annex3}
          user={authUser}
        />
      ),
      style: {
        ...panelStyle,
        background: isApprovedAnnex(annex3?.status)
          ? "#ecffc2"
          : "rgba(0, 0, 0, 0.03)",
      },
      collapsible: isApprovedAnnex(annex3.status) ? "disabled" : "visible",
    },
    {
      key: "annex4",
      label: (
        <Col span={24}>
          {annex4 && (
            <div className="header-annex">
              <AnnexTitle
                title="Anexo 4"
                status={practicesStatus?.[annex4?.status]}
              />
              <AnnexStatus annex={annex4} />
            </div>
          )}
        </Col>
      ),
      children: !isApprovedAnnex(annex4?.status) && (
        <Annex4Integration
          practice={practice}
          user={authUser}
          annex4={annex4}
        />
      ),
      style: {
        ...panelStyle,
        background: isApprovedAnnex(annex4?.status)
          ? "#ecffc2"
          : "rgba(0, 0, 0, 0.03)",
      },
      collapsible: isApprovedAnnex(annex4.status) ? "disabled" : "visible",
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
      children: !isApprovedAnnex(annex6.status) && (
        <Annex6Integration
          practice={practice}
          user={authUser}
          annex6={annex6}
        />
      ),
      style: {
        ...panelStyle,
        background: isApprovedAnnex(annex6?.status)
          ? "#ecffc2"
          : "rgba(0, 0, 0, 0.03)",
      },
      collapsible:
        !hasPermissions ||
        isApprovedAnnex(annex6.status) ||
        isCompanyRepresentative
          ? "disabled"
          : "visible",
    },
  ];

  const panelStyle = {
    marginBottom: "1em",
    borderRadius: "1em",
    border: "none",
  };

  return (
    <Container>
      {isNew ? (
        <ManageCreateProductIntegration
          practice={practice}
          practitioner={practitioner}
          users={users}
          user={authUser}
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
                {isMobile ? (
                  <h5 style={{ margin: "0" }} className="capitalize">
                    Módulo {practice?.moduleNumber}: {practice?.name}
                  </h5>
                ) : (
                  <h2 style={{ margin: "0" }} className="capitalize">
                    Módulo {practice?.moduleNumber}: {practice?.name}
                  </h2>
                )}
                {isExistsAcademicSupervisorAndCoordinatorInPractice && (
                  <IconAction
                    icon={faFilePdf}
                    styled={{ color: (theme) => theme.colors.error }}
                    onClick={() =>
                      navigate(
                        `/practices/${practice.id}/module${practice.moduleNumber}/sheets`
                      )
                    }
                    tooltipTitle="Ver pdf"
                  />
                )}
              </div>
              <br />
              {practice?.status === "approved" && (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Alert
                      type="success"
                      showIcon
                      message={
                        <>
                          Felicidades, el Módulo {practice?.moduleNumber} ha
                          sido completado de manera exitosa.
                        </>
                      }
                    />
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <InitialInformation
                practice={practice}
                user={authUser}
                company={company}
                practitioner={practitioner}
                supervisor={supervisor}
                representativeCompany={representativeCompany}
              />
            </Col>
          </Row>
          <br />
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <h2>Anexos</h2>
            </Col>
            <Col span={24}>
              <Collapse
                bordered={false}
                defaultActiveKey={
                  isCompanyRepresentative
                    ? [
                        annex2.status !== "approved" && "annex2",
                        annex3.status !== "approved" && "annex3",
                        annex4.status !== "approved" && "annex4",
                      ]
                    : [
                        annex2.status !== "approved" && "annex2",
                        annex3.status !== "approved" && "annex3",
                        annex4.status !== "approved" && "annex4",
                        annex6.status !== "approved" && "annex6",
                      ]
                }
                expandIconPosition="end"
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
            </Col>
            <Col span={24}>
              <ObservationsList
                observationsPractice={practice?.observations}
                practice={practice}
              />
            </Col>
            <Col span={24}>
              {isAcademicSupervisor && practice?.status !== "approved" && (
                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={() => setVisibleForm(true)}
                >
                  Observación de módulo
                </Button>
              )}
              <ObservationOfPracticeModal
                practice={practice}
                visibleForm={visibleForm}
                onSetVisibleForm={setVisibleForm}
              />
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
                    Aprobar el módulo completo
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

  .ant-card {
    .ant-card-body {
      padding: 1em;
    }
  }

  .header-wrapper {
    width: 100%;
    display: grid;
    gap: 0.7em;
    grid-template-columns: auto 1fr auto;
    ${mediaQuery.minDesktop} {
      gap: 0.5em;
      grid-template-columns: auto 1fr auto;
    }
  }
  .header-annex {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    flex-wrap: wrap;
  }
`;
