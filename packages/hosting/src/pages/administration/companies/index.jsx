import React from "react";
import { CompanyTable } from "./CompanyTable";
import Row from "antd/lib/row";
import {
  Acl,
  AddButton,
  modalConfirm,
  notification,
  Title,
} from "../../../components";
import Col from "antd/lib/col";
import { Divider } from "antd";
import { useGlobalData } from "../../../providers";
import { useNavigate } from "react-router";
import { useDefaultFirestoreProps } from "../../../hooks";
import { updateCompany } from "../../../firebase/collections/companies";

export const Companies = () => {
  const navigate = useNavigate();
  const { companies } = useGlobalData();
  const { assignDeleteProps } = useDefaultFirestoreProps();

  const navigateTo = (companyId) => navigate(`/companies/${companyId}`);

  const onAddCompany = () => navigate("new");
  const onEditCompany = (companyId) => navigateTo(companyId);
  const onDeleteCompany = async (company) => {
    try {
      await updateCompany(company.id, assignDeleteProps({ isDeleted: true }));
      notification({ type: "success" });
    } catch (e) {
      console.error("ErrorDeleteCompanies: ", e);
      notification({ type: "error" });
    }
  };

  const onConfirmRemoveCompany = async (company) =>
    modalConfirm({
      content: "La empresa se eliminará",
      onOk: async () => {
        await onDeleteCompany(company);
      },
    });

  return (
    <Acl redirect name="/companies">
      <Row gutter={[16, 16]}>
        <Acl name="/companies/new">
          <>
            <Col span={24}>
              <AddButton onClick={onAddCompany} title="Empresa" margin="0" />
            </Col>
            <Divider />
          </>
        </Acl>
        <Col span={24}>
          <Title level={3}>Empresas</Title>
        </Col>
        <Col span={24}>
          <CompanyTable
            companies={companies}
            onEditCompany={onEditCompany}
            onConfirmRemoveCompany={onConfirmRemoveCompany}
          />
        </Col>
      </Row>
    </Acl>
  );
};
