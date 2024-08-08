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
            <h3>ANEXO 4</h3>
            <h5>
              INFORME VALORATIVO DE EVALUACIÓN DE PRÁCTICAS PRE-PROFESIONALES
            </h5>
          </div>
          <div className="body__subtitle1">
            <h5>I. DATOS PERSONALES: </h5>
          </div>
          <div className="body__datacompany">
            <ul>
              <li>
                <span> 1.</span>
                <span>
                  Apellidos y Nombres del practicante:&nbsp;
                  <strong>{fullName(practitioner)} </strong>
                </span>
              </li>
              <li>
                <span> 2.</span>
                <span>
                  Carrera Profesional:&nbsp;
                  <strong>{ProfessionalCareerValue}</strong>
                </span>
              </li>
              <li>
                <span> 3.</span>
                <span>
                  Modulo Tecnico Profesional N° {practice.moduleNumber}:&nbsp;
                  <strong className="capitalize">{practice.name}</strong>
                </span>
              </li>
              <li>
                <span> 4.</span>
                <span>
                  Duracion de PPP:&nbsp; <strong>{practice.hours}</strong>
                </span>
              </li>
              <li>
                <span> 5.</span>
                <span>
                  Periodo de Evaluación:&nbsp;
                  <strong>
                    {practice?.startDate
                      ? dayjs(practice.startDate, "DD/MM/YYYY").format(
                          "DD/MM/YYYY"
                        )
                      : "-"}
                    &nbsp; - &nbsp;
                    {practice?.endDate
                      ? dayjs(practice.endDate, "DD/MM/YYYY").format(
                          "DD/MM/YYYY"
                        )
                      : "-"}
                  </strong>
                  &nbsp;&nbsp;&nbsp; Total de horas:&nbsp;
                  <strong>{practice.hours}</strong>
                </span>
              </li>
              <li>
                <span> 6.</span>
                <span>
                  Nombre de la Empresa o Institución: &nbsp;
                  <br />
                  <span className="capitalize">
                    <strong>{company.socialReason}</strong>
                  </span>
                  <br />
                </span>
              </li>
              <li>
                <span>7.</span>
                <span>
                  Giro de la Empresa o Institución:&nbsp;
                  <strong>{company?.category}</strong>
                </span>
              </li>
              <li>
                <span>8.</span>
                <span>
                  Dirección:&nbsp; <strong>{company?.address}</strong>
                </span>
              </li>
              <li>
                <span></span>
                <span>
                  Telefono:&nbsp;{" "}
                  <strong>{practitioner?.phone?.number} </strong>
                </span>
              </li>
              <li>
                <span> 9.</span>
                <span>
                  Supervisor Calificador de la Empresa o Institucion:&nbsp;
                </span>
              </li>
              <li>
                <span></span>
                <span className="capitalize">
                  Nombre:&nbsp;{" "}
                  <strong>{fullName(representativeCompany)}</strong>
                </span>
              </li>
              <li>
                <span></span>
                <span>
                  Cargo:&nbsp;{" "}
                  <strong>
                    {getBusinessPosition(
                      representativeCompany?.companyRepresentativeData
                        ?.businessPosition
                    )?.label || ""}
                  </strong>
                </span>
              </li>
              <li>
                <span> 10.</span>
                <span>Lugares de Practica:&nbsp;</span>
              </li>
              <li>
                <div className="center_work">
                  <table>
                    <tbody>
                      {Object.entries(PracticeArea).map(([key, object]) => (
                        <tr key={key}>
                          <td>{object.name}</td>
                          <td>{key === practice?.practiceArea ? "x" : ""}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </li>
              <li>
                <span> 11.</span>
                <span>
                  Horario de practicas:{" "}
                  <strong>
                    {dayjs(practice?.entryTime, "HH:mm:ss").format("HH:mm")} -{" "}
                    {dayjs(practice?.departureTime, "HH:mm:ss").format("HH:mm")}
                  </strong>
                </span>
              </li>
              <li>
                <span> 12.</span>
                <span>
                  Tareas asignadas según el modulo indicado: <br />
                  <br />
                  <div className="task-box capitalize">{practice?.task}</div>
                </span>
              </li>
            </ul>

            <div className="body__subtitle1">
              <h5>II. INSTRUCCIONES PARA LA EVALUACIÓN CUALITATIVA: </h5>
            </div>

            <ul>
              <li>
                <span>1.</span>
                <span className="justify">
                  Examine cuidadosamente cada uno de los criterios (A, B, C, D,
                  E, F), de la Ficha de Evaluación adjunta, que consta de 20
                  indicadores a calificar. Para fines referenciales se tomara en
                  cuenta la siguiente tabla de equivalencia
                </span>
              </li>
            </ul>

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
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  font-size: 14px;

  .task-box {
    width: fit-content;
    margin: auto;
    padding: 10px;
    border: 1px solid black;
    text-align: center;
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

          .center_work {
            table {
              font-size: 10px;
              margin: 1em;
              width: 400px;
              border-collapse: collapse;
              text-align: center;
              margin-left: 10em;

              td {
                width: 50px;
                border: 1px solid black;
                padding: 1px;
              }
            }
          }
        }
      }
    }
  }

  .table-container {
    width: fit-content;
    margin: 2em auto;

    table {
      border-collapse: collapse;
      text-align: center;
      margin: auto;
      font-size: 11px;

      td {
        border: 1px solid black;
        padding: 5px;
      }
    }
  }
`;
