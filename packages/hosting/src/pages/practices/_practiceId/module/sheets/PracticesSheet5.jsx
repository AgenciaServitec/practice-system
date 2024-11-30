import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { fullName, getBusinessPosition } from "../../../../../utils";
import { ProfessionalCareer } from "../../../../../data-list";
import { PracticeArea } from "../../../../../data-list";
import dayjs from "dayjs";

export const PracticesSheet5 = ({
  practitioner,
  practice,
  company,
  representativeCompany,
  annexNumber,
}) => {
  const ProfessionalCareerValue = ProfessionalCareer.find(
    (profession) =>
      profession.value === practitioner?.practitionerData?.professionalCareer
  )?.label;

  const moduleHours = {
    1: "265 horas",
    2: "290 horas",
    3: "296 horas",
  };

  return (
    <>
      <Container id="annex4">
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
              annexNumber === "annex4" && "annex4-title"
            }`}
          >
            <h3>ANEXO 4</h3>
            <h5>
              INFORME VALORATIVO DE EVALUACIÓN DE PRÁCTICAS PRE-PROFESIONALES
            </h5>
          </div>
          <div className="body__subtitle1">
            <h5>I. DATOS PERSONALES: </h5>
          </div>
          <div className="body__datacompany">
            <ol>
              <li>
                <span>Apellidos y Nombres del practicante: </span>
                <span className="capitalize">{fullName(practitioner)} </span>
              </li>
              <li>
                <span>Carrera Profesional: </span>
                <span>{ProfessionalCareerValue}</span>
              </li>
              <li>
                <span>
                  Módulo Técnico Profesional N° {practice.moduleNumber}:{" "}
                </span>
                <span className="capitalize">{practice.name}</span>
                <div className="div-row">
                  <span>Duración de PPP: </span>
                  <span>{moduleHours?.[practice?.moduleNumber] || 0}</span>
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
                <div className="div-row">
                  <span>Total de horas: </span>
                  <span>{practice.hours} horas</span>
                </div>
              </li>
              <li>
                <span>Nombre de la Empresa o Institución: </span>
                <span className="capitalize">{company?.socialReason}</span>
              </li>
              <li>
                <span>Giro de la Empresa o Institución: </span>
                <span className="capitalize">{company?.category}</span>
              </li>
              <li>
                <div className="div-row">
                  <div className="div-row">
                    <span>Dirección: </span>
                    <span>{company?.address}</span>
                  </div>
                  <div className="div-row">
                    <span>Telefono: </span>
                    <span>{practitioner?.phone?.number} </span>
                  </div>
                </div>
              </li>
              <li>
                <span>Supervisor Calificador de la Empresa o Institucion:</span>
                <div className="div-row">
                  <span>Nombre: </span>
                  <span className="capitalize">
                    {fullName(representativeCompany)}
                  </span>
                </div>
                <div className="div-row">
                  <span>Cargo: </span>
                  <span className="capitalize">
                    {getBusinessPosition(
                      representativeCompany?.companyRepresentativeData
                        ?.businessPosition
                    )?.label || ""}
                  </span>
                </div>
              </li>
              <li>
                <span>Lugares de Práctica:</span>
                <div className="table_center_work">
                  {Object.entries(PracticeArea).map(([key, object]) => (
                    <div key={key}>
                      {object.name}:{" "}
                      {key === practice?.practiceArea ? "x" : " - "}
                    </div>
                  ))}
                </div>
              </li>
              <li>
                <span>Horario de prácticas: </span> Lunes a Viernes de{" "}
                <span>
                  {dayjs(practice?.entryTime, "HH:mm:ss").format("HH:mm")} -{" "}
                  {dayjs(practice?.departureTime, "HH:mm:ss").format("HH:mm")}
                </span>
              </li>
              <li>
                <span>Tareas asignadas, según el modulo indicado:</span>
                <div className="task-box capitalize">
                  <p>{practice?.task}</p>
                </div>
              </li>
            </ol>

            <div className="body__subtitle1">
              <h5>II. INSTRUCCIONES PARA LA EVALUACIÓN CUALITATIVA: </h5>
            </div>

            <ul>
              <li>
                <span>1. </span>
                <span className="justify">
                  Examine cuidadosamente cada uno de los criterios (A, B, C, D,
                  E, F), de la Ficha de Evaluación adjunta, que consta de 20
                  indicadores a calificar. Para fines referenciales se tomara en
                  cuenta la siguiente tabla de equivalencia
                </span>
              </li>
              <li>
                <span></span>
                <div className="table-container">
                  <table>
                    <tbody>
                      <tr>
                        <td>ESCALA LITERAL</td>
                        <td>ESCALA CUALITATIVA</td>
                        <td>ESCALA CUANTITATIVA</td>
                      </tr>
                      <tr>
                        <td>A</td>
                        <td>Muy Buena</td>
                        <td>19 a 20</td>
                      </tr>
                      <tr>
                        <td>B</td>
                        <td>Buena</td>
                        <td>15 a 18</td>
                      </tr>
                      <tr>
                        <td>C</td>
                        <td>Aceptable</td>
                        <td>13 a 14</td>
                      </tr>
                      <tr>
                        <td>D</td>
                        <td>Deficiente</td>
                        <td>12 a menos</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <span>2. </span>
                <span>
                  Cada indicador se calificará de 0 a 1, se sumarán las veinte
                  (calificaciones) para obtener el puntaje total, luego se
                  establecerá las equivalencias con la tabla anterior para
                  expresar la evaluación final en forma cualitativa y literal.
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

  .task-box {
    width: 100%;
    padding: 1rem;
    border: 1px solid black;
    text-align: center;

    p {
      margin: 0;
      font-weight: 700;
    }
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
      margin-bottom: 2em;
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

      .table_center_work {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

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
            display: flex;
            flex-direction: row;
            gap: 1rem;
          }
        }
      }

      ul {
        list-style: none;
        line-height: 1.5em;

        li {
          display: grid;
          grid-template-columns: 2em 1fr;

          .item-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
          }

          .justify {
            text-align: justify;
          }
        }
      }
    }
  }

  .table-container {
    width: fit-content;
    margin: 1.3em auto;
    font-weight: bold;

    table {
      border-collapse: collapse;
      text-align: center;
      margin: auto;
      font-size: 13px;

      td {
        border: 1px solid black;
        padding: 5px;
      }
    }
  }
`;
