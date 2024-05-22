import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";

export const PracticesSheet4 = () => {
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
            <div className="career">
              <h5>CARRERA PROFESIONAL : </h5>
            </div>
            <div className="description">
              <h5>Computación e Informática</h5>
              <text>(Ingresantes a partir del año 2021)</text>
            </div>
          </div>
          <div className="body__data">
            <ol>
              <li>
                &nbsp;Apellidos y Nombres del Practicante:{" "}
                <strong>Aguirre Vizalote Mónica Luz</strong>
              </li>
              <li>
                &nbsp;N° y Denominación del Módulo Técnico Profesional:{" "}
                <strong>
                  N° 1 | Gestión de Soporte Técnico, Seguridad y Tecnologías de
                  la Información y Comunicación
                </strong>
              </li>
              <li>
                &nbsp;Duración de las PPP: <strong>320 horas</strong>
              </li>
              <li>
                &nbsp;Fecha de inicio de las PPP: <strong>20 de junio</strong>
              </li>
              <li>
                &nbsp;Nombre de la Empresa, Institución o Centro de Prácticas:
                <br />
                <strong>&quot;LOS INSUMOS GENERALES E.I.R.L&quot;</strong>
              </li>
            </ol>
            <div className="company">
              <ul>
                <li>
                  Giro de la Empresa o Institución:{" "}
                  <strong>VENTA DE INSUMOS QUÍMICOS</strong>
                </li>
                <li>
                  Dirección: <strong>JR. Daniel Garcés 464 Urb. P. Baja</strong>
                </li>
                <li>
                  Teléfono: <strong>929393949</strong>
                </li>
                <li>
                  Docente supervisor:{" "}
                  <strong>Dr. Ing. Eladio Llamoga Sánchez</strong>
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
                    <td>01</td>
                    <td>15/11/2023</td>
                    <td>
                      Mantenimiento Preventivo y Correctivo de equipos de
                      Cómputo
                    </td>
                    <td>100%</td>
                    <td>-</td>
                  </tr>
                </Table>
                <li>
                  Dificultades detectadas durante las prácticas: <br />
                  <br />
                  <hr />
                  <br />
                </li>
                <li>
                  Sugerencias y Recomendaciones: <br />
                  <br />
                  <hr />
                  <br />
                  <hr />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer__firm1">
            <span>Supervisor(a) de Prácticas IESTP &quot;GLBR&quot;</span>
            <br />
            <span>Mg. Yaya Gómez María Emilia</span>
          </div>
          <div className="footer__firm2">
            <span>Representante de la Empresa</span>
            <br />
            <span>Roberto Alcides Mendoza Perca</span>
          </div>
        </div>
        <div className="footer2">
          <span>Firma y Sello del Gerente General</span>
          <br />
          <span>Lozada Yntuscca Orlando Roberto</span>
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
    &__title {
      margin: auto;
      text-align: center;
      width: 600px;

      h3 {
        text-decoration: underline;
        text-decoration-color: black;
      }
    }
    &__career {
      margin-top: 1.5em;
      display: flex;
      justify-content: center;
      .career {
        width: 195px;
      }
      .description {
        width: 285px;
        text-align: center;
        line-height: 0.8em;
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
