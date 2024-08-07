import React, { useEffect } from "react";
import { modalConfirm, notification } from "../../../../../../components";
import Row from "antd/lib/row";
import styled from "styled-components";
import { updateAnnex } from "../../../../../../firebase/collections/annexs";
import { isUndefined } from "lodash";
import { AnnexButtons } from "../AnnexButtons";

export const Annex6Integration = ({ practice, user, annex6 }) => {
  useEffect(() => {
    (async () => {
      const { approvedByCompanyRepresentative, approvedByAcademicSupervisor } =
        annex6;

      await updateAnnex(practice.id, "annex6", {
        status:
          approvedByCompanyRepresentative && approvedByAcademicSupervisor
            ? "approved"
            : isUndefined(approvedByCompanyRepresentative) ||
              isUndefined(approvedByAcademicSupervisor)
            ? "pending"
            : "refused",
      });
    })();
  }, [annex6]);

  const hasPermissions =
    user.roleCode === "company_representative" ||
    user.roleCode === "academic_supervisor";

  const onApprovedAnnex4 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas aprovar el anexo 6?",
      content: "El anexo 6 pasara al estado de aprobado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para aprobar!",
          });
        }

        await updateAnnex(practice.id, "annex6", {
          ...(user.roleCode === "company_representative" && {
            approvedByCompanyRepresentative: true,
          }),
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: true,
          }),
        });

        notification({ type: "success" });
      },
    });

  const onRefusedAnnex6 = async (practice) =>
    modalConfirm({
      title: "Seguro que deseas rechazar el anexo 6?",
      content: "El anexo 6 pasara al estado de rechazado",
      onOk: async () => {
        if (!hasPermissions) {
          return notification({
            type: "warning",
            title: "No tienes permisos para rechazar!",
          });
        }

        await updateAnnex(practice.id, "annex6", {
          ...(user.roleCode === "company_representative" && {
            approvedByCompanyRepresentative: false,
          }),
          ...(user.roleCode === "academic_supervisor" && {
            approvedByAcademicSupervisor: false,
          }),
        });

        notification({ type: "success" });
      },
    });

  return (
    <ContainerRow gutter={[16, 16]}>
      <AnnexButtons
        annexName="annex6"
        hasPermissions={hasPermissions}
        practice={practice}
        onRefusedAnnex={onRefusedAnnex6}
        onApprovedAnnex={onApprovedAnnex4}
      />
    </ContainerRow>
  );
};

const ContainerRow = styled(Row)`
  .item-sheet {
    width: 100%;
    background: #f1f0f0;
    padding: 1em;
    border-radius: 1em;
  }

  .ant-space-item {
    width: 100%;
  }
`;
