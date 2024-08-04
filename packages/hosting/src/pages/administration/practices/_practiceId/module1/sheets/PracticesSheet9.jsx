import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../../images";
import moment from "moment";
import { fullName } from "../../../../../../utils";

export const PracticesSheet9 = ({
  practice,
  practitioner,
  company,
  supervisor,
}) => (
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
        <div className="body__subtitle1">
          <h5>III. DATOS DE LA PRACTICA PRE-PROFESIONAL: </h5>
        </div>
        <div className="body__datacompany">
          <ul>
            <li>
              <span>
                <strong>1.</strong>
              </span>
              <span>
                <span>
                  <strong>Módulo del Plan Curricular Vinculado:&nbsp;</strong>
                </span>
                <br />
                <span className="capitalize">
                  N° {practice.moduleNumber} | {practice.name}
                </span>
              </span>
            </li>
            <li>
              <span>
                <strong> 2. </strong>
              </span>
              <span>
                <strong>
                  Funciones y/o tareas asignadas de acuerdo al módulo:&nbsp;
                </strong>
              </span>
              <br />
              <span className="capitalize">{practice.task}</span>
            </li>
            <li>
              <span>
                <strong> 3. </strong>
              </span>
              <span>
                <strong>Total, de horas acumuladas: </strong> {practice.hours}{" "}
                horas
              </span>
            </li>
            <li>
              <span>
                <strong> 4. </strong>
              </span>
              <span>
                <strong>Período de ejecución de la práctica: </strong> del del{" "}
                <span className="capitalize">
                  {moment(practice.startDate, "DD/MM/YYYY").format("LL")}{" "}
                </span>{" "}
                al &nbsp;
                <span className="capitalize">
                  {moment(practice.endDate, "DD/MM/YYYY").format("LL")}{" "}
                </span>{" "}
              </span>
            </li>
            <li>
              <span>
                <strong> 5. </strong>
              </span>
              <span>
                <strong>Horario de Prácticas: </strong>{" "}
                {`${practice.entryTime} - ${practice.departureTime}`}
              </span>
            </li>
            <li>
              <span>
                <strong> 6. </strong>
              </span>
              <span>
                <strong>Lugar de práctica: </strong>
              </span>
              <div className="center_work">
                <table>
                  <tbody>
                    <tr>
                      <td>Oficina</td>
                      <td>
                        {practice.practiceArea === "Oficina" ||
                        practice.practiceArea === "oficina"
                          ? "x"
                          : ""}
                      </td>
                      <td>Taller</td>
                      <td>
                        {practice.practiceArea === "Taller" ||
                        practice.practiceArea === "taller"
                          ? "x"
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Laboratorio</td>
                      <td>
                        {practice.practiceArea === "Laboratorio" ||
                        practice.practiceArea === "laboratorio"
                          ? "x"
                          : ""}
                      </td>
                      <td>Granja o Campo</td>
                      <td>
                        {practice.practiceArea === "Granja o Campo" ||
                        practice.practiceArea === "granja o campo"
                          ? "x"
                          : ""}
                      </td>
                    </tr>
                    <tr>
                      <td>Almacén</td>
                      <td>
                        {practice.practiceArea === "Almacén" ||
                        practice.practiceArea === "almacén"
                          ? "x"
                          : ""}
                      </td>
                      <td>Otros</td>
                      <td>
                        {practice.practiceArea === "Otros" ||
                        practice.practiceArea === "otros"
                          ? "x"
                          : ""}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <span>
                <strong> 7. </strong>
              </span>
              <span>
                <strong>
                  Aspectos desarrollados referente al módulo del Plan
                  Curricular:{" "}
                </strong>
              </span>
              <br />
              <span className="capitalize">{practice.task}</span>
            </li>
          </ul>
          <div className="body__final">
            <text>
              Habiendo verificado que el estudiante si ha practicado, informo a
              la Jefatura de Área Académica de la carrera de: Computación e
              Informática para los fines pertinentes.
            </text>
            <br />
            <br />
            <text>
              Adjunto fichas de Supervisión de los siguientes módulos:
            </text>
            <br />
            <br />
            <span>
              ANEXO 2: Ficha de aceptación de prácticas pre-profesional.
            </span>
            <br />
            <span>
              ANEXO 3: Ficha de supervisión y monitoreo de prácticas
              pre-profesionales.
            </span>
            <br />
            <span>
              ANEXO 4: Informe valorativo de evaluación de prácticas
              pre-profesionales.
            </span>
            <br />
            <span>COPIA DE DNI.</span>
            <br />
            <br />
            <span>
              <strong>Observaciones:</strong>
            </span>
            <br />
            <br />
            <br />
            <hr />
            <br />
            <br />
            <hr />
            <br />
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer__atempt">
          <span>Atentamente</span>
        </div>
        <div className="footer__firm">
          <span className="capitalize">{fullName(supervisor)}&nbsp;</span>
          <br />
          <span>DOCENTE SUPERVISOR DE PRÁCTICAS IESTP &quot;GLBR&quot;</span>
        </div>
        <div className="footer__tip">
          <span>
            <strong>NOTA: </strong> Entregar por mesa de partes 4 ejemplares(01
            para la Jefatura de Área Académica; 01 para la Unidad Académica; 01
            para Secretaría Académica y 01 para el cargo).
          </span>
        </div>
      </div>
    </Container>
  </>
);

const Container = styled.div`
  font-size: 14px;

  .header {
    text-align: center;
    line-height: 1em;
    display: flex;
    margin-bottom: 2em;
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
        display: flex;
        flex-direction: column;
        gap: 1em;
        list-style: none;
        margin-top: 2em;

        li {
          display: grid;
          grid-template-columns: 2em 1fr;

          div:first-child {
            font-weight: bold;
          }

          div:last-child {
            span:first-child {
              display: flex;
              margin-bottom: 0.8em;
              font-weight: 700;
            }
          }

          .center_work {
            margin: auto;
            padding-left: 4em;

            table {
              margin: 1em;
              width: 400px;
              border-collapse: collapse;
              text-align: center;

              td {
                border: 1px solid black;
                padding: 5px;
              }
            }
          }
        }
      }
    }

    &__final {
      margin: auto;
      width: 550px;
      font-size: 14px;
    }
  }

  .footer {
    margin-top: 2em;
    text-align: center;

    &__atempt {
      margin-bottom: 6em;
    }

    &__firm {
      width: 400px;
      margin: auto;
      border-top: 2px solid black;
      padding-top: 0.5em;
    }

    &__tip {
      padding-top: 3em;
      width: 570px;
      margin: auto;
      text-align: justify;
    }
  }
`;
