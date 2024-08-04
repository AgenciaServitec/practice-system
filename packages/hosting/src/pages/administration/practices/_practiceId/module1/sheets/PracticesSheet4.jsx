import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../../images";
import moment from "moment";
import { fullName } from "../../../../../../utils";

export const PracticesSheet4 = ({
  practitioner,
  practice,
  company,
  representativeCompany,
  supervisor,
  annex3,
}) => {
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
            <h3>ANEXO 3</h3>
            <h5>
              FICHA DE SUPERVISIÓN Y MONITOREO DE PRÁCTICAS PRE - PROFESIONALES
            </h5>
          </div>
          <div className="body__career">
            <div className="text-item">
              <span>
                <strong>CARRERA PROFESIONAL : Computación e Informática</strong>
                (Ingresantes a partir del año 2021)
              </span>
            </div>
          </div>
          <div className="body__data">
            <ol>
              <li>
                &nbsp;Apellidos y Nombres del Practicante:{" "}
                <strong>{fullName(practitioner)}</strong>
              </li>
              <li>
                &nbsp;N° y Denominación del Módulo Técnico Profesional:{" "}
                <strong>
                  N° {practice?.moduleNumber} |{" "}
                  <span className="capitalize">{practice?.name}</span>
                </strong>
              </li>
              <li>
                &nbsp;Duración de las PPP:{" "}
                <strong>{practice?.hours} horas</strong>
              </li>
              <li>
                &nbsp;Fecha de inicio de las PPP:{" "}
                <strong>
                  {moment(practice?.startDate, "DD/MM/YYYY").format(
                    "DD/MM/YYYY"
                  )}
                </strong>
              </li>
              <li>
                &nbsp;Nombre de la Empresa, Institución o Centro de Prácticas:
                <br />
                <strong className="capitalize">
                  &quot;{company?.socialReason}&quot;
                </strong>
              </li>
            </ol>
            <div className="company">
              <ul>
                <li>
                  Giro de la Empresa o Institución:{" "}
                  <strong>DesarrolLo de apps</strong>
                </li>
                <li>
                  Dirección: <strong>{company?.address}</strong>
                </li>
                <li>
                  Teléfono: <strong>929393949</strong>
                </li>
                <li>
                  Docente supervisor: <strong>{fullName(supervisor)}</strong>
                </li>
                <Table>
                  <tr>
                    <th className="number">N° de VISITA</th>
                    <th className="date">FECHA DE SUPERVISION</th>
                    <th className="works">
                      TAREAS O ACTIVIDADES DESARROLLADAS
                    </th>
                    <th className="status">ESTADO DE AVANCE (En horas y %)</th>
                    <th className="observation">OBSERVACIONES</th>
                  </tr>
                  <tr>
                    <td>{annex3?.visitNumber || ""}</td>
                    <td>
                      {annex3?.supervisionDate
                        ? moment(
                            annex3.supervisionDate.toDate(),
                            "DD/MM/YYYY"
                          ).format("DD/MM/YYYY")
                        : ""}
                    </td>
                    <td>{practice?.task || ""}</td>
                    <td>{annex3?.progressStatus || ""}</td>
                    <td>{annex3?.observations || ""}</td>
                  </tr>
                </Table>
                <br />
                <li>
                  <div className="response-item">
                    <span>Dificultades detectadas durante las prácticas:</span>
                    <span>{annex3?.difficultiesDetected || <br />}</span>
                    <hr />
                  </div>
                </li>
                <br />
                <li>
                  <div className="response-item">
                    Sugerencias y Recomendaciones:
                    <span>{annex3?.suggestionsRecommendations || <br />}</span>
                    <hr />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer__firm1">
            <strong>Supervisor(a) de Prácticas IESTP &quot;GLBR&quot;</strong>
            <br />
            <span className="capitalize">{fullName(supervisor)}</span>
          </div>
          <div className="footer__firm2">
            <strong>Representante de la Empresa</strong>
            <br />
            <span className="capitalize">
              {fullName(representativeCompany)}
            </span>
          </div>
        </div>
        {/*<div className="footer2">*/}
        {/*  <span>Firma y Sello del Gerente General</span>*/}
        {/*  <br />*/}
        {/*  <span>{fullName(representativeCompany)}</span>*/}
        {/*</div>*/}
      </Container>
    </>
  );
};
const Container = styled.div`
  .header {
    text-align: center;
    line-height: 1em;
    display: flex;
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
      margin: auto;
      text-align: center;

      h3 {
        text-decoration: underline;
        text-decoration-color: black;
      }
    }
    &__career {
      .text-item {
        display: flex;
        justify-content: center;
        gap: 0.5em;
        width: 37em;
        text-align: center;
        margin: auto;
      }
    }
    &__data {
      padding-top: 1em;
      width: 550px;
      margin: auto;
      ol {
        line-height: 1.6em;
      }
      .company {
        margin: auto;
        width: 500px;
        ul {
          line-height: 1.6em;
        }
      }
    }

    .response-item {
      display: flex;
      flex-direction: column;
    }
  }
  .footer {
    display: flex;
    width: 605px;
    margin: auto;
    gap: 2em;
    padding-top: 5em;

    &__firm1 {
      padding-top: 0.5em;
      border-top: 2px solid #000;
      width: 289px;
      text-align: center;
    }
    &__firm2 {
      padding-top: 0.5em;
      border-top: 2px solid #000;
      width: 289px;
      text-align: center;
      padding-bottom: 5em;
    }
  }
  .footer2 {
    padding-top: 0.5em;
    border-top: 2px solid black;
    text-align: center;
    width: 400px;
    margin: auto;
  }
`;
const Table = styled.table`
  margin-top: 1em;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
  th {
    padding: 0.5em;
    border: 1px solid black;
    text-align: center;
    font-size: 11px;
    line-height: 1.5em;
  }
  td {
    border: 1px solid black;
    text-align: center;
    font-size: 12px;
    line-height: 1.5em;
    padding: 0.5em;
  }
`;
