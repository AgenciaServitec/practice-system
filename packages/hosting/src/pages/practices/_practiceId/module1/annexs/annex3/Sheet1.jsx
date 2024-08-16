import React, { useState } from "react";
import {
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { useDefaultFirestoreProps } from "../../../../../../hooks";
import { firestore } from "../../../../../../firebase";
import { ObservationsList } from "../../ObservationsList";
import dayjs from "dayjs";
import { ObservationForSupervisor } from "./ObservationForSupervisor";
import { ObservationForRepresentativeCompany } from "./ObservationForRepresentativeCompany";

export const Sheet1Integration = ({ practice, annex3, user }) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();
  const [loading, setLoading] = useState(false);

  const mapForm = (formData) => ({
    ...formData,
    status: "pending",
  });

  const onSaveSheet1Annex3 = async (formData) => {
    try {
      setLoading(true);
      await firestore
        .collection("practices")
        .doc(practice.id)
        .collection("annexs")
        .doc("annex3")
        .update({ ...assignUpdateProps(mapForm(formData)) });

      notification({
        type: "success",
        title:
          "Felicidades por completar el anexo 3, ahora solo debes esperar la aprobación de un supervisor académico",
      });
    } catch (e) {
      console.log(e);
      notification({ type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onConfirmSaveSheet1 = (practice) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: async () => await onSaveSheet1Annex3(practice),
    });

  return (
    <Sheet1
      annex3={annex3}
      onConfirmSaveSheet1={onConfirmSaveSheet1}
      user={user}
      practice={practice}
      loading={loading}
    />
  );
};

const Sheet1 = ({ annex3, onConfirmSaveSheet1, user, practice, loading }) => {
  const hasPermissionSupervisor = user?.roleCode === "academic_supervisor";
  const hasPermissionRepresentative =
    user?.roleCode === "company_representative";

  return (
    <>
      {hasPermissionSupervisor ? (
        <ObservationForSupervisor
          annex3={annex3}
          loading={loading}
          onConfirmSaveSheet1={onConfirmSaveSheet1}
        />
      ) : hasPermissionRepresentative ? (
        <ObservationForRepresentativeCompany
          annex3={annex3}
          loading={loading}
          onConfirmSaveSheet1={onConfirmSaveSheet1}
        />
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={5}>
              I. FICHA DE SUPERVISIÓN Y MONITOREO DE PRÁCTICAS
              PRE-PROFESIONALES:
            </Title>
          </Col>
          <Col span={24} md={8}>
            <div className="item">
              <label>
                <strong>Número de Visita: </strong>
              </label>
              <p>{annex3?.visitNumber || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div className="item">
              <label>
                <strong>Fecha de supervisión: </strong>
              </label>
              <p>
                {annex3.supervisionDate
                  ? dayjs(annex3.supervisionDate.toDate()).format("DD/MM/YYYY")
                  : "-"}
              </p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div className="item">
              <label>
                <strong>Estado de avance (en %): </strong>
              </label>
              <p>{annex3?.progressStatus || "-"}&nbsp;%</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div className="item">
              <label>
                <strong>Observaciones:</strong>
              </label>
              <p>{annex3?.observations || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div className="item">
              <label>
                <strong>Dificultades: </strong>
              </label>
              <p>{annex3?.difficultiesDetected || "-"}</p>
            </div>
          </Col>
          <Col span={24} md={8}>
            <div className="item">
              <label>
                <strong>Sugerencias y Recomendaciones: </strong>
              </label>
              <p>{annex3?.suggestionsRecommendations || "-"}</p>
            </div>
          </Col>
        </Row>
      )}
      <ObservationsList user={user} annex={annex3} practice={practice} />
    </>
  );
};
