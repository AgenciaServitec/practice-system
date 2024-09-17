import React, { useState } from "react";
import {
  Acl,
  AddButton,
  Col,
  DataEntryModal,
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
import { PracticesTable } from "./Practices.Table";
import { useAuthentication, useGlobalData } from "../../providers";
import { Divider } from "antd";
import { PracticesFilters } from "./Practices.Filters";

export const CorrespondencesIntegration = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { assignDeleteProps } = useDefaultFirestoreProps();
  const { users, practices } = useGlobalData();

  const navigateTo = (pathname) => navigate(pathname);
  const onAddPractice = () => navigateTo("new");
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

  return (
    <Practices
      practices={practices}
      users={users}
      user={authUser}
      onNavigateTo={navigateTo}
      onEditPractice={onEditPractice}
      onConfirmRemovePractice={onConfirmRemovePractice}
      onAddPractice={onAddPractice}
    />
  );
};

const Practices = ({
  practices,
  users,
  user,
  onNavigateTo,
  onEditPractice,
  onConfirmRemovePractice,
  onAddPractice,
}) => {
  const [isVisiblePracticeEdit, setIsVisiblePracticeEdit] = useState(false);

  const [filterFields, setFilterFields] = useQueriesState({
    user: "all",
    status: "all",
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
          (practice) =>
            practice.companyId === user?.companyRepresentativeData.companyId
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
          {user.roleCode === "user" && (
            <Col span={24}>
              <Acl name="/practices/new">
                <>
                  <Col span={24}>
                    <AddButton
                      onClick={onAddPractice}
                      title="Práctica"
                      margin="0"
                    />
                  </Col>
                  <Divider />
                </>
              </Acl>
            </Col>
          )}
          <Col span={24}>
            <Title level={3}>Prácticas Pre-Profesionales</Title>
          </Col>
          <Col span={24}>
            <Legend title="Filtros">
              <PracticesFilters
                practices={_practices}
                users={users}
                filterFields={filterFields}
                onFilter={setFilterFields}
              />
            </Legend>
          </Col>
          <Col span={24}>
            <PracticesTable
              practices={practicesView}
              user={user}
              users={users}
              onNavigateTo={onNavigateTo}
              onEditPractice={onEditPractice}
              onConfirmRemovePractice={onConfirmRemovePractice}
            />
          </Col>
        </Row>
        <DataEntryModal
          visible={isVisiblePracticeEdit}
          onCancel={() => setIsVisiblePracticeEdit(false)}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut cumque
          distinctio dolor, dolorum, ducimus eius facere iure maxime, natus
          necessitatibus neque odit officia quos sequi sint vel veniam voluptas
          voluptates.
        </DataEntryModal>
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
  practices
    .filter((practice) =>
      filterFields.user === "all"
        ? true
        : filterFields.user === practice.practitionerId
    )
    .filter((practice) =>
      filterFields.status === "all"
        ? true
        : filterFields.status === practice.status
    );
