import React, { useEffect, useState } from "react";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { IconAction, Title } from "../../../../components";
import { InitialPracticeFormIntegration } from "./InitialForm";
import {
  addPractice,
  getPracticesId,
  updatePractice,
} from "../../../../firebase/collections";
import { useNavigate, useParams } from "react-router";
import { useAuthentication, useGlobalData } from "../../../../providers";
import { useDefaultFirestoreProps } from "../../../../hooks";
import { Collapse, Space } from "antd";
import {
  faArrowDown,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Anexo2Integration } from "./anexo2";

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
    isNew
      ? await addPractice(assignCreateProps(practice))
      : await updatePractice(practice.id, assignUpdateProps(practice));
  };

  const getItems = () => [
    {
      key: "1",
      label: "Información",
      children: (
        <InitialPracticeFormIntegration
          practice={practice}
          user={authUser}
          users={users}
          practitioner={practitioner}
          company={company}
          onSavePractice={savePractice}
        />
      ),
    },
    {
      key: "2",
      label: "Anexo 2",
      children: (
        <Anexo2Integration
          practice={practice}
          user={authUser}
          users={users}
          practitioner={practitioner}
          company={company}
          onSavePractice={savePractice}
        />
      ),
    },
  ];

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
            <Title level={3}>Registro de Prácticas Pre-Profesionales</Title>
          </Space>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={3}>Información</Title>
        </Col>
        <Col span={24}></Col>
        <Col span={24}>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            expandIcon={({ isActive }) => (
              <FontAwesomeIcon icon={isActive ? faArrowDown : faArrowRight} />
            )}
            items={getItems()}
          />
        </Col>
      </Row>
    </>
  );
};
