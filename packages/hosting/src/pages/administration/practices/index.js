import React from "react";
import Row from "antd/lib/row";
import {
  Acl,
  AddButton,
  Button,
  modalConfirm,
  notification,
  Title,
} from "../../../components";
import Col from "antd/lib/col";
import { Divider } from "antd";
import { useAuthentication, useGlobalData } from "../../../providers";
import { useNavigate } from "react-router";
import { updatePractice } from "../../../firebase/collections";
import { useDefaultFirestoreProps } from "../../../hooks";
import { PracticeTable } from "./PracticeTable";
import { isEmpty } from "lodash";

export const Practices = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { practices, users } = useGlobalData();
  const { assignDeleteProps } = useDefaultFirestoreProps();

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
    <Acl redirect name="/practices">
      <Row gutter={[16, 16]}>
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
        <Col span={24}>
          <Title level={3}>Prácticas</Title>
        </Col>
        <Col span={24}>
          <PracticeTable
            practices={practices}
            users={users}
            onEditPractice={onEditPractice}
            onConfirmRemovePractice={onConfirmRemovePractice}
          />
        </Col>
      </Row>
    </Acl>
  );
};
