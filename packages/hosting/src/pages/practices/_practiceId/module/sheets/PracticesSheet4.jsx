import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { findRole, fullName, getBusinessPosition } from "../../../../../utils";
import dayjs from "dayjs";
import { SignatureItem } from "../../SignatureItem";

export const PracticesSheet4 = ({
  practitioner,
  practice,
  company,
  representativeCompany,
  supervisor,
  annex3,
  annexNumber,
}) => {
  return (
    <>
      <Container id="annex3">
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
              annexNumber === "annex3" && "annex3-title"
            }`}
          >
            <h3>ANEXO 3</h3>
            <h5>
              FICHA DE SUPERVISIÓN Y MONITOREO DE PRÁCTICAS PRE - PROFESIONALES
            </h5>
          </div>
          <div className="body__career">
            <div className="text-item">
              <span>
                <strong>CARRERA PROFESIONAL : Computación e Informática</strong>
                (Ingresantes a partir del año {dayjs().format("YYYY")})
              </span>
            </div>
          </div>
          <div className="body__data">
            <ol>
              <li>
                <span>Apellidos y Nombres del Practicante: </span>
                <span className="capitalize">{fullName(practitioner)}</span>
              </li>
              <li>
                <span>N° y Denominación del Módulo Técnico Profesional: </span>
                <span>N° {practice?.moduleNumber} | </span>
                <span className="capitalize">{practice?.name}</span>
              </li>
              <li>
                <span>Fecha de inicio de las PPP: </span>
                <span>
                  del{" "}
                  <span>
                    {dayjs(practice?.startDate, "DD/MM/YYYY").format(
                      "DD [de] MMMM [del] YYYY"
                    )}
                  </span>
                </span>{" "}
                <strong>Término de las PPP: </strong>
                <span>
                  {dayjs(practice?.endDate, "DD/MM/YYYY").format(
                    "DD [de] MMMM [del] YYYY"
                  )}
                </span>
                <div className="div-row">
                  <span>Total de horas: </span>
                  <span>{practice?.hours} horas</span>
                </div>
              </li>
              <li>
                <span>
                  Nombre de la Empresa, Institución o Centro de Prácticas:{" "}
                </span>
                <span className="capitalize">
                  &quot;{company?.socialReason}&quot;
                </span>
              </li>
            </ol>
            <div className="company">
              <ul>
                <li>
                  <span>Giro de la Empresa o Institución: </span>
                  <span className="capitalize">{company?.category}</span>
                </li>
                <li>
                  <span>Dirección: </span>
                  <span>{company?.address}</span>
                </li>
                <li>
                  <span>Teléfono: </span>
                  <span>{representativeCompany?.phone?.number}</span>
                </li>
                <li>
                  <span>Docente supervisor: </span>
                  <span className="capitalize">{fullName(supervisor)}</span>
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
                        ? dayjs(annex3.supervisionDate.toDate()).format(
                            "DD/MM/YYYY"
                          )
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
        <div className="signatures">
          <div className="up">
            <SignatureItem
              signaturePhoto={
                practice.status === "approved"
                  ? supervisor?.signaturePhoto?.url
                  : null
              }
              fullName={fullName(supervisor)}
              role={findRole(supervisor.roleCode)?.signature}
            />
            <SignatureItem
              signaturePhoto={
                practice.status === "approved"
                  ? practitioner?.signaturePhoto?.url
                  : null
              }
              fullName={fullName(practitioner)}
              role={findRole(practitioner.roleCode)?.name}
            />
          </div>
          <div className="down">
            <SignatureItem
              signaturePhoto={
                practice.status === "approved"
                  ? representativeCompany?.signaturePhoto?.url
                  : null
              }
              fullName={fullName(representativeCompany)}
              businessPosition={
                getBusinessPosition(
                  representativeCompany?.companyRepresentativeData
                    ?.businessPosition
                )?.label
              }
              role={findRole(representativeCompany?.roleCode)?.signature}
            />
          </div>
        </div>
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
    margin-bottom: 1.5em;
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
            gap: 1rem;

            > span:first-child {
              font-weight: 700;
            }
          }
        }
      }
      .company {
        margin: auto;
        ul {
          line-height: 1.4em;

          li {
            > span:first-child {
              font-weight: 700;
            }
          }
        }
      }
    }

    .response-item {
      display: flex;
      flex-direction: column;
    }
  }
  .signatures {
    width: 100%;
    .up {
      margin: auto;
      width: 80%;
      display: flex;
    }
    .down {
      width: 50%;
      margin: auto;
    }
  }
`;
const Table = styled.table`
  margin-top: 1em;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
  th {
    padding: 0.3em;
    border: 0.5px solid black;
    text-align: center;
    font-size: 10px;
    line-height: 1.5em;
  }
  td {
    border: 1px solid black;
    text-align: center;
    font-size: 12px;
    line-height: 1.5em;
    padding: 0.3em;
  }
`;
