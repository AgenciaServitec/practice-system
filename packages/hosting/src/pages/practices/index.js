import React from "react";
import {
  Acl,
  AddButton,
  Button,
  Col,
  Legend,
  modalConfirm,
  notification,
  Row,
  Title,
} from "../../components/ui";
import { updatePractice } from "../../firebase/collections";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useDefaultFirestoreProps, useQueriesState } from "../../hooks";
import { PracticeModalProvider } from "./PracticeModalProvider";
import { PracticesTable } from "./PracticesTable";
import { useAuthentication, useGlobalData } from "../../providers";
import { isEmpty } from "lodash";
import { Divider } from "antd";
import { PracticesFilters } from "./Practices.Filters";

export const CorrespondencesIntegration = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { assignDeleteProps } = useDefaultFirestoreProps();
  const { users, practices } = useGlobalData();

  const navigateTo = (practiceId) => navigate(`/practices/${practiceId}`);
  const onAddPractice = () => navigate("new");
  const onEditPractice = (practiceId) => navigateTo(practiceId);
  const onDeletePractice = async (practice) => {
    try {
      await updatePractice(practice.id, assignDeleteProps({ isDeleted: true }));
      notification({ type: "success" });
    } catch (e) {
      console.error("ErrorDeletePractice: ", e);
      notification({ type: "error" });
    }
  };

  const onConfirmRemovePractice = async (practice) =>
    modalConfirm({
      content: "La practica se eliminará",
      onOk: async () => {
        await onDeletePractice(practice);
      },
    });

  const onValidateAddPractice = () => {
    if (
      !authUser?.academicCoordinatorId ||
      !authUser.academicSupervisorId ||
      isEmpty(authUser.companiesIds)
    ) {
      return notification({
        type: "warning",
        title: "Debe completar su perfil para crear una práctica",
        btn: (
          <Button type="primary" onClick={() => navigate("/profile")}>
            Click aquí!
          </Button>
        ),
      });
    }

    onAddPractice();
  };

  return (
    <PracticeModalProvider>
      <Practices
        practices={practices}
        users={users}
        user={authUser}
        onNavigateTo={navigateTo}
        onEditPractice={onEditPractice}
        onConfirmRemovePractice={onConfirmRemovePractice}
        onValidateAddPractice={onValidateAddPractice}
      />
    </PracticeModalProvider>
  );
};

const Practices = ({
  practices,
  users,
  user,
  onNavigateTo,
  onEditPractice,
  onConfirmRemovePractice,
  onValidateAddPractice,
}) => {
  const [filterFields, setFilterFields] = useQueriesState({
    user: "all",
  });

  const mappedPractice = (practice) => {
    const _practitioner = users.find(
      (user) => user.id === practice.practitionerId
    );

    return {
      ...practice,
      user: _practitioner?.id ? _practitioner.id : "all",
    };
  };

  const getPracticesByRoleCode = (roleCode) => {
    switch (roleCode) {
      case "super_admin":
        return practices;
      case "admin":
        return practices;
      case "academic_supervisor":
        return practices.filter(
          (practice) => practice?.academicSupervisorId === user?.id
        );
      case "academic_coordinator":
        return practices.filter(
          (practice) => practice?.academicCoordinatorId === user?.id
        );
      case "company_representative":
        return practices.filter(
          (practice) => practice?.companyRepresentativeId === user?.id
        );
      case "user":
        return practices.filter(
          (practice) => practice?.practitionerId === user?.id
        );
    }
  };

  const _practices = getPracticesByRoleCode(user?.roleCode).map(mappedPractice);

  const practicesView =
    mapPracticesView(_practices).filter(filterFields).practices;

  return (
    <Acl name="/practices" redirect>
      <Container>
        <Row justify="space-between" align="middle" gutter={[16, 16]}>
          <Col span={24}>
            <Acl name="/practices/new">
              <>
                <Col span={24}>
                  <AddButton
                    onClick={onValidateAddPractice}
                    title="Práctica"
                    margin="0"
                  />
                </Col>
                <Divider />
              </>
            </Acl>
          </Col>
          <Col span={24}>
            <Title level={3}>Prácticas Pre-Profesionales</Title>
          </Col>
          <Col span={24}>
            <Legend title="Filtros">
              <PracticesFilters
                practices={_practices}
                users={users}
                filter={filterFields}
                onFilter={setFilterFields}
              />
            </Legend>
          </Col>
          <Col span={24}>
            <PracticesTable
              practices={practicesView}
              users={users}
              onNavigateTo={onNavigateTo}
              onEditPractice={onEditPractice}
              onConfirmRemovePractice={onConfirmRemovePractice}
            />
          </Col>
        </Row>
      </Container>
    </Acl>
  );
};

const Container = styled.div`
  .capitalize {
    text-transform: capitalize;
  }
`;

const mapPracticesView = (practices) => {
  const mapView = {
    practices: practices,
    filter(filterFields) {
      mapView.practices = filteredPractices(mapView.practices, filterFields);
      return mapView;
    },
  };

  return mapView;
};

const filteredPractices = (practices, filterFields) =>
  practices.filter((practice) =>
    filterFields.user === "all"
      ? true
      : filterFields.user === practice.practitionerId
  );
