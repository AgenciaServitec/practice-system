import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { fullName } from "../../../../../utils";
import { ProfessionalCareer } from "../../../../../data-list";
import dayjs from "dayjs";

export const PracticesSheet7 = ({
  practitioner,
  practice,
  supervisor,
  annexNumber,
}) => {
  const namesInitials =
    `${supervisor?.paternalSurname} ${supervisor?.maternalSurname} ${supervisor?.firstName}`
      .split(" ")
      .map((initial) => initial.slice(0, 1))
      .join("");

  const ProfessionalCareerValue = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  )?.label;

  return (
    <>
      <Container id="annex6">
        <div className="header">
          <div className="header__gilda">
            <img src={LogoGilda} alt="" />
          </div>
          <div className="header__institute">
            <h5>INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO</h5>
            <h5>&quot;GILDA LILIANA BALLIVIÁN ROSADO&quot;</h5>
          </div>
        </div>
        <div className="body">
          <div
            className={`body__title ${
              annexNumber === "annex6" && "annex6-title"
            }`}
          >
            <h3>ANEXO 6</h3>
            <h4>INFORME DE PRÁCTICA PRE- PROFESIONAL</h4>
          </div>
          <div className="body__subtitle1">
            <div className="rbody__title">
              San Juan de Miraflores, {dayjs().format("DD MMMM YYYY")}
            </div>
            <h4>
              INFORME N° 001 - {dayjs().format("YYYY")} -{" "}
              {supervisor ? namesInitials.toUpperCase() : ""} – CI - IESTP
              &quot;GLBR&quot;
            </h4>
            <div className="lbody__title">
              <div className="vertical-align">
                <p className="capitalize">
                  <strong>SEÑOR(A):</strong> {fullName(supervisor)}
                </p>
                <p className="supervisor-rol">
                  <strong>
                    {" "}
                    COORDINADOR(A) DEL ÁREA ACADÉMICA DE COMPUTACIÓN E
                    INFORMÁTICA DEL IESTP
                  </strong>
                </p>
                <p>
                  <strong>&quot;GILDA LILIANA BALLIVIAN ROSADO&quot;</strong>
                </p>
              </div>
            </div>
            <div className="items">
              <div className="item-asunto">
                <strong>ASUNTO:</strong>
              </div>
              <div className="item-informe">
                <p>INFORME DE SUPERVISIÓN DE PRÁCTICAS PREPROFESIONALES</p>
                <p className="capitalize">
                  Estudiante: {fullName(practitioner)}
                </p>
              </div>

              <div className="item-asunto">
                <strong>REFERENCIA:</strong>
              </div>
              <div className="item-informe">
                <p>REGLAMENTO DE PRÁCTICAS PRE-PROFESIONALES</p>
              </div>
            </div>
            <div>
              ---------------------------------------------------------------------------------------------
            </div>
            <div className="item-footer" style={{ marginBottom: "1em" }}>
              Mediante el presente me dirijo a usted para saludarla, a la vez
              informar respecto al desarrollo de las Prácticas Pre-profesionales
              efectuadas por el/la estudiante:{" "}
              <strong className="capitalize">{fullName(practitioner)}</strong>{" "}
              como a continuación detallo:
            </div>
          </div>
          <div className="body__subtitle1">
            <h5>I. DATOS GENERALES DEL PRACTICANTE:</h5>
          </div>
          <div className="body__datacompany">
            <ol>
              <li>
                <div>
                  <span>Apellidos y Nombres del practicante: </span>
                  <span className="capitalize">{fullName(practitioner)}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>Carrera profesional: </span>
                  <span>{ProfessionalCareerValue}</span>
                </div>
                <div>
                  <span>
                    Módulo (s) Técnico-Profesional(es) ejecutado del Plan
                    Curricular:{" "}
                  </span>
                  <span className="capitalize">
                    N° {practice.moduleNumber}: {practice.name}
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span>
                    Período de estudios (Año de ingreso - Año de egreso):
                  </span>
                  <span>
                    {practitioner?.practitionerData?.entryYear || ""} -&nbsp;
                    {practitioner?.practitionerData?.yearGraduation ||
                      "En Curso"}
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span>Domicilio: </span>
                  <span>{practitioner?.address || "-"}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>Teléfonos (Domicilio-Personal)</span>
                  <span>
                    {`${practitioner?.phone?.prefix} ${practitioner?.phone?.number}` ||
                      "-"}
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span>Correo electrónico (E-mail)</span>
                  <span>{practitioner.email}</span>
                </div>
              </li>
              <li>
                <span>DNI: </span>
                <span>{practitioner.dni}</span>
              </li>
              <li>
                <span>Código de matrícula: </span>
                <span>{practitioner.practitionerData?.tuitionId}</span>
              </li>
              <li>
                <div className="div-row">
                  <div>
                    <span>Semestre: </span>
                    <span>
                      {practitioner.practitionerData?.semester || "Egresado"}
                    </span>
                  </div>
                  <div>
                    <span>Turno: </span>
                    <span>{practitioner.practitionerData?.studentShift}</span>
                  </div>
                </div>
              </li>
              <li>
                <span>Periodo de Evaluación: </span>
                <span>
                  del{" "}
                  <span className="capitalize">
                    {dayjs(practice.startDate, "DD/MM/YYYY").format("LL")}{" "}
                  </span>{" "}
                  al &nbsp;
                  <span className="capitalize">
                    {dayjs(practice.endDate, "DD/MM/YYYY").format("LL")}{" "}
                  </span>{" "}
                </span>
              </li>
              <li>
                <span>Total de Horas: </span>
                <span>{practice.hours} horas</span>
              </li>
            </ol>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  font-size: 14px;

  .rbody__title {
    margin-left: 20em;
    margin-top: 2em;
    margin-bottom: 2em;
  }

  h4 {
    text-align: center;
  }

  .lbody__title {
    text-align: left;
    width: 605px;
    margin: 1em auto auto auto;

    .supervisor-rol {
      font-size: 13px;
    }
    p {
      margin-bottom: 0.5em;
    }
  }
  .items {
    width: 605px;
    display: grid;
    grid-template-columns: 100px 1fr;
    text-align: left;
    margin: 1em auto auto;
    p {
      margin-bottom: 0.5em;
    }
  }
  .item-footer {
    text-align: left;
    width: 605px;
    margin: 1em auto auto auto;
  }

  .header {
    text-align: center;
    line-height: 1em;
    display: flex;
    margin-bottom: 1em;
    opacity: 0.8;

    img {
      width: 100%;
      height: 100%;
    }

    &__gilda {
      width: 90px;
      height: 60px;
      margin-right: 3em;
    }
  }
  .body {
    &__title {
      margin-bottom: 0.5em;
      text-align: center;
      h3 {
        text-decoration: underline;
        text-decoration-color: black;
      }
    }

    &__subtitle1,
    &__subtitle2,
    &__subtitle3 {
      width: 605px;
      margin: auto;
    }
    &__datacompany,
    &__company {
      width: 570px;
      margin: auto;
      ol {
        line-height: 1.5;
        li {
          > span:first-child {
            font-weight: 700;
          }
          div {
            display: flex;
            flex-direction: column;

            > span:first-child {
              font-weight: 700;
            }
          }
          .div-row {
            flex-direction: row;
            gap: 3rem;

            div {
              flex-direction: row;
              gap: 1rem;
            }

            > span:first-child {
              font-weight: 700;
            }
          }
        }
      }

      ul {
        list-style: none;
        line-height: 1.5em;

        li {
          display: grid;
          grid-template-columns: 2em 1fr;
          margin-bottom: 5px;
          .item-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }
        }
      }
    }
  }
`;
