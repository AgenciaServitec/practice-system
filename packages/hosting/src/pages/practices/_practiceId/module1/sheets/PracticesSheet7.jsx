import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { fullName } from "../../../../../utils";
import { ProfessionalCareer } from "../../../../../data-list";
import dayjs from "dayjs";

export const PracticesSheet7 = ({
  practitioner,
  practice,
  company,
  representativeCompany,
  supervisor,
  annex4,
}) => {
  const ProfessionalCareerValue = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  )?.label;

  return (
    <>
      <Container>
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
          <div className="body__title">
            <h3>ANEXO 6</h3>
            <h4>INFORME DE PRACTICA PRE- PROFESIONAL</h4>
            <div className="rbody__title">
              San Juan de Miraflores, {dayjs().format("DD MMMM YYYY")}
            </div>
            <h4>INFORME N° 001 - 2023 - ELS – CI - IESTP &quot;GLBR&quot;</h4>
            <div className="lbody__title">
              <div className="vertical-align">
                <p className="capitalize">SEÑOR(A): {fullName(supervisor)}</p>
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
                <p>INFORME DE SUPERVISIÓN DE PRACTICAS PREPROFESIONALES</p>
                <p className="capitalize">
                  Estudiante: {fullName(practitioner)}
                </p>
              </div>

              <div className="item-asunto">
                <strong>REFERENCIA:</strong>
              </div>
              <div className="item-informe">
                <p>REGLAMENTO DE PRACTICAS PRE-PROFESIONALES</p>
              </div>
            </div>
            <div>
              -------------------------------------------------------------------------------------------------------------
            </div>
            <div className="item-footer" style={{ marginBottom: "1em" }}>
              Mediante el presente me dirijo a usted para saludarla, a la vez
              informar respecto al desarrollo de las Prácticas Pre-profesionales
              efectuadas por el/la estudiante:{" "}
              <strong>{fullName(practitioner)}</strong> como a continuación
              detallo:
            </div>
          </div>
          <div className="body__subtitle1">
            <h5>I. DATOS GENERALES DEL PRACTICANTE:</h5>
          </div>
          <div className="body__datacompany">
            <ul>
              <li>
                <span>
                  <strong> 1. </strong>
                </span>
                <span>
                  <strong> Apellidos y Nombres del practicante:</strong> <br />
                  {fullName(practitioner)}
                </span>
              </li>
              <li>
                <span>
                  <strong> 2. </strong>
                </span>
                <span>
                  <strong> Carrera profesional:</strong> <br />
                  {ProfessionalCareerValue}
                </span>
              </li>
              <li>
                <span>
                  <strong> 3. </strong>
                </span>
                <span>
                  <strong>
                    {" "}
                    Módulo (s) Técnico-Profesional(es) ejecutado del Plan
                    Curricular :
                  </strong>{" "}
                  <br />
                  <span className="capitalize">
                    N° {practice.moduleNumber}: {practice.name}
                  </span>
                </span>
              </li>
              <li>
                <span>
                  <strong> 4. </strong>
                </span>
                <span>
                  <strong>
                    Periodo de estudios (Año de ingreso - Año de egreso)
                  </strong>
                  <br />
                  {practitioner?.practitionerData?.entryYear || ""} -&nbsp;
                  {practitioner?.practitionerData?.yearGraduation || "En Curso"}
                </span>
              </li>
              <li>
                <span>
                  <strong> 5. </strong>
                </span>
                <span>
                  <strong>Domicilio: </strong>
                  <br />
                  {practitioner?.address || "-"}
                </span>
              </li>
              <li>
                <span>
                  <strong> 6. </strong>
                </span>
                <span>
                  <strong>Teléfonos (domicilio-personal): </strong>
                  <br />
                  {`${practitioner?.phone?.prefix} ${practitioner?.phone?.number}` ||
                    "-"}
                </span>
              </li>
              <li>
                <span>
                  <strong> 7. </strong>
                </span>
                <span>
                  <strong>Correo electrónico (e-mail)</strong>
                  <br />
                  {practitioner.email}{" "}
                </span>
              </li>
              <li>
                <span>
                  <strong> 8. </strong>
                </span>
                <span>
                  <strong>DNI: </strong>
                  {practitioner.dni}
                </span>
              </li>
              <li>
                <span>
                  <strong> 9. </strong>
                </span>
                <span>
                  <strong>Código de matrícula: </strong>
                  {practitioner.practitionerData?.tuitionId}
                </span>
              </li>
              <li>
                <span>
                  <strong> 10.</strong>
                </span>
                <span>
                  <div className="item-grid">
                    <div>
                      <strong>Semestre: </strong>
                      {practitioner.practitionerData?.semester || "Egresado"}
                    </div>
                    <div className="capitalize">
                      {" "}
                      <strong>Turno: </strong>
                      {practitioner.practitionerData?.studentShift ||
                        "Egresado"}
                    </div>
                  </div>
                </span>
              </li>
              <li>
                <span>
                  <strong> 11. </strong>
                </span>
                <span>
                  <strong>Periodo de Evaluación: </strong>
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
                <span>
                  <strong> 12. </strong>
                </span>
                <span>
                  <strong>Total de Horas: </strong>
                  {practice.hours} horas
                </span>
              </li>
            </ul>
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
