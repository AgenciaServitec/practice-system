import React, { useEffect } from "react";
import {
  Acl,
  Button,
  Form,
  Input,
  modalConfirm,
  notification,
  Title,
} from "../../../../../../components";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useDefaultFirestoreProps,
  useFormUtils,
} from "../../../../../../hooks";
import { firestore } from "../../../../../../firebase";
import styled from "styled-components";
import { PracticeArea } from "../../../../../../data-list";
import { ObservationsList } from "../../ObservationsList";
import dayjs from "dayjs";
import { fullName } from "../../../../../../utils";
import {
  BusinessPosition,
  ProfessionalCareer,
} from "../../../../../../data-list";

export const Sheet1Integration = ({
  practice,
  user,
  company,
  practitioner,
  representativeCompany,
  annex2,
}) => {
  const { assignUpdateProps } = useDefaultFirestoreProps();

  const mapForm = (formData) => ({
    refreshment: formData.refreshment,
    mobility: formData.mobility,
    others: formData.others,
    status: "pending",
  });

  const onSaveSheet1Annex2 = async (formData) => {
    try {
      await firestore
        .collection("practices")
        .doc(practice.id)
        .collection("annexs")
        .doc("annex2")
        .update({ ...assignUpdateProps(mapForm(formData)) });

      notification({
        type: "success",
        title:
          "Felicidades por completar el anexo 2, ahora solo debes esperar la aprobación de un supervisor académico",
      });
    } catch (e) {
      console.log(e);
      notification({ type: "error" });
    }
  };

  const onConfirmSaveSheet1 = (practice) =>
    modalConfirm({
      title: "¿Estás seguro de que quieres guardar con los ultimos cambios?",
      onOk: async () => await onSaveSheet1Annex2(practice),
    });

  return (
    <Sheet1
      practice={practice}
      user={user}
      company={company}
      practitioner={practitioner}
      representativeCompany={representativeCompany}
      annex2={annex2}
      onConfirmSaveSheet1={onConfirmSaveSheet1}
    />
  );
};

const Sheet1 = ({
  practice,
  user,
  company,
  practitioner,
  representativeCompany,
  annex2,
  onConfirmSaveSheet1,
}) => {
  const BusinessPositionValue = BusinessPosition.find(
    (position) =>
      position.value ===
      representativeCompany?.companyRepresentativeData?.businessPosition
  )?.label;

  const ProfessionalCareerValue = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  )?.label;

  const schema = yup.object({
    refreshment: yup.string(),
    mobility: yup.string(),
    others: yup.string(),
  });
  const {
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { required, error } = useFormUtils({ errors, schema });

  useEffect(() => {
    resetForm();
  }, [annex2]);

  const resetForm = () => {
    reset({
      refreshment: annex2?.refreshment || "",
      mobility: annex2?.mobility || "",
      others: annex2?.others || "",
    });
  };

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>I. DATOS DE LA EMPRESA O INSTITUCIÓN</Title>
        </Col>
        <Col span={24}>
          <div>
            <label>Razón Social de la Empresa: </label>
            <p>{company?.socialReason || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div>
            <label>Dirección: </label>
            <p>{company?.address || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={12}>
          <div>
            <label>Distrito: </label>
            <p>{company?.district || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Teléfono: </label>
            <p>
              {`${representativeCompany?.phone?.prefix} ${representativeCompany?.phone?.number}` ||
                "-"}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>
              Encargado del control de Prácticas Pre-Profesionales:{" "}
            </label>
            <p>{fullName(representativeCompany) || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Cargo: </label>
            <p>{BusinessPositionValue || "-"}</p>
          </div>
        </Col>
        <Col span={24}>
          <Title level={5}>II. DATOS DEL PRACTICANTE</Title>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Apellidos y Nombres: </label>
            <p>{fullName(practitioner) || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Carrera Profesional: </label>
            <p>{ProfessionalCareerValue || "-"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Turno: </label>
            <p>{practitioner?.practitionerData?.studentShift || "Egresado"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Semestre: </label>
            <p>{practitioner?.practitionerData?.semester || "Egresado"}</p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Año Académico: </label>
            <p>{practitioner?.practitionerData?.academicYear || "Egresado"}</p>
          </div>
        </Col>
        <Col span={24}>
          <Title level={5}>
            III. LA EMPRESA O INSTITUCIÓN OFRECE LO SIGUIENTE
          </Title>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Período de la práctica: </label>
            <p>
              {dayjs(practice?.startDate, "D/MM/YY").format("D MMMM YYYY")} -{" "}
              {dayjs(practice?.endDate, "D/MM/YY").format("D MMMM YYYY")}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Horario: </label>
            <p>
              {dayjs(practice?.entryTime, "HH:mm:ss").format("HH:mm a")} -
              {dayjs(practice?.departureTime, "HH:mm:ss").format("HH:mm a")}
            </p>
          </div>
        </Col>
        <Col span={24} md={8}>
          <div>
            <label>Dpto. Sector o Área de las Prácticas: </label>
            <p>{PracticeArea?.[practice?.practiceArea]?.name || "-"}</p>
          </div>
        </Col>
        <br />
        <Col span={24}>
          <Form onSubmit={handleSubmit(onConfirmSaveSheet1)}>
            <Row gutter={[16, 16]}>
              <Col span={24} md={8}>
                <Controller
                  name="refreshment"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="Refrigerio (opcional)"
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
              <Col span={24} md={8}>
                <Controller
                  name="mobility"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="Movilidad (opcional)"
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
              <Col span={24} md={8}>
                <Controller
                  name="others"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value, name } }) => (
                    <Input
                      label="Otros (opcional)"
                      name={name}
                      value={value}
                      onChange={onChange}
                      error={error(name)}
                      required={required(name)}
                    />
                  )}
                />
              </Col>
            </Row>
            <ObservationsList user={user} annex={annex2} practice={practice} />
            <Acl name="/practices/:practiceId/annex#save">
              <Row justify="end" gutter={[16, 16]}>
                <Col span={24} sm={6} md={4}>
                  <Button type="primary" size="large" block htmlType="submit">
                    Guardar
                  </Button>
                </Col>
              </Row>
            </Acl>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  div {
    p:last-child {
      font-weight: 500;
      text-transform: capitalize;
      font-size: 1.1em;
      margin: 0;
    }
  }
`;
