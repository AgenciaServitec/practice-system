import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import moment from "moment";

export const PracticesSheet6 = () => (
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
        <div className="body__tip">
          <span>2. </span>
          <span>
            Cada indicador se calificará de 0 a 1, se sumarán las veinte
            (calificaciones) para obtener el puntaje total, luego se establecerá
            las equivalencias con la tabla anterior para expresar la evaluación
            final en forma cualitativa y literal.
          </span>
        </div>
        <div className="body__title">
          <h5>FICHA DE EVALUACIÓN: CRITERIOS Y CALIFICACIÓN</h5>
        </div>
        <Table>
          <tr>
            <th className="description_a">
              <div className="item-row">
                <span> A. </span>{" "}
                <span>ORGANIZACIÓN Y EJECUCIÓN DEL TRABAJO</span>
              </div>
            </th>
            <th className="point">CALIF.</th>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>1. </span>
                <span>Programa convenientemente su trabajo.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>2. </span> <span>Trabajo rápido.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>3. </span>
                <span>Identifica los objetos de la empresa.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <th className="description_b">
              <div className="item-row">
                <span>B. </span>
                <span>CAPACIDAD TÉCNICO EMPRESARIAL</span>
              </div>
            </th>
            <th className="point">CALIF.</th>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>4. </span>
                <span>
                  Plantea soluciones acertadas a problemas que se originan en el
                  trabajo.
                </span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>5. </span>
                <span>Toma decisiones acertadas y oportunas.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>6. </span>
                <span>
                  Tiene habilidad para organizar, planificar y dirigir las
                  prestaciones de servicios que ofrece la empresa.
                </span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>7. </span>
                <span>
                  Coopera con la conservación, matenimiento de los equipos de la
                  empresa.
                </span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <th className="description_a">
              <div className="item-row">
                <span>C. </span>
                <span>CUMPLIMIENTO EN EL TRABAJO</span>
              </div>
            </th>
            <th className="point">CALIF.</th>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>8. </span>
                <span>Demuestra seguridad, habilidad en el trabajo.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>9. </span>
                <span>
                  Usa adecuadamente: Registros, formularios, comprobantes,
                  materiales, máquinas de oficina, taller, laboratorio o campo.
                </span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>10. </span>
                <span>Es puntual y no llega tarde.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>11. </span>
                <span>Disciplinado en la realización de tareas.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>12. </span>
                <span>Se comunica con fluidez y propiedad.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <th className="description_a">
              <div className="item-row">
                <span>D. </span>
                <span>CALIDAD EN LA EJECUCIÓN</span>
              </div>
            </th>
            <th className="point">CALIF.</th>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>13. </span>
                <span>Calidad, presentación, cuidado en alto grado.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>14. </span>
                <span>Denota interés por aprender cosas nuevas.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <th className="description_a">
              <div className="item-row">
                <span>E. </span>
                <span>TRABAJO EN EQUIPO</span>
              </div>
            </th>
            <th className="point">CALIF.</th>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>15. </span>
                <span>Tiene capacidad de integración, colaboración.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>16. </span>
                <span>Tiene cortesía, buen trato y don de gente.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>17. </span>
                <span>Realiza tareas en beneficio de sus compañeros.</span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <th className="description_a">
              <div className="item-row">
                <span>F. </span>
                <span>INICIATIVA</span>
              </div>
            </th>
            <th className="point">CALIF.</th>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>18. </span>
                <span>
                  Participa activamente en los clubes deportivos y/o culturales
                  de su empresa.
                </span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>19. </span>
                <span>
                  Muestra iniciativa y seriedad. Sus planteamientos son
                  definidos.
                </span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <td>
              <div className="item-row">
                <span>20. </span>
                <span>
                  Ejecuta acciones de adiestramiento espontáneo a sus compañeros
                  de trabajo cuando lo requiera el caso.
                </span>
              </div>
            </td>
            <td>1</td>
          </tr>
          <tr>
            <th>
              <div className="item-last-row">
                <span>PUNTAJE TOTAL:</span>
              </div>
            </th>
            <td>20</td>
          </tr>
        </Table>
        <div className="body__note">
          <span>Nota: </span>
          <span>
            La presente hoja de evaluación será devuelta junto con la Constancia
            de Prácticas Pre-Profesionales que otorgue la empresa al
            practicante.
          </span>
        </div>
        <div className="body__results">
          <strong>
            <div className="evaluation">
              <span>EVALUACIÓN FINAL: </span>
              <div className="cuality">
                <span>CUALITATIVA: </span>
                <span>MUY BUENA</span>
              </div>
              <div className="literally">
                <span>LITERAL: </span>
                <span>A</span>
              </div>
            </div>
          </strong>
        </div>
        <div className="body__date">
          <span>
            <strong>Lugar y Fecha: </strong>
          </span>
          <span>SAN JUAN DE MIRAFLORES, {moment().format("DD MMMM YYYY")}</span>
        </div>
      </div>
      <div className="footer">
        <div className="footer__firma">
          <text>Firma y Sello del Gerente General</text>
          <br />
          <text>Mendoza Perca Roberto Alcides</text>
        </div>
      </div>
    </Container>
  </>
);

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
    padding-bottom: 5em;

    &__tip {
      gap: 1em;
      display: flex;
      width: 570px;
      text-align: justify;
      margin: auto;
      padding-top: 0.5em;
      padding-bottom: 1em;
    }

    &__title {
      text-align: center;
      padding-bottom: 1em;
    }

    &__note {
      font-size: 11px;
      text-align: justify;
      margin: auto;
      width: 570px;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5em;
      padding-top: 0.5em;
    }

    &__results {
      padding-top: 1em;
      width: 570px;
      margin: auto;

      .evaluation {
        display: flex;
        gap: 1.5em;
      }
    }

    &__date {
      width: 570px;
      padding-top: 0.5em;
      margin: auto;
    }
  }

  .footer {
    width: 500px;
    margin: auto;
    text-align: center;
    border-top: 2px solid #000;

    &__firma {
      margin-top: 0.5em;
    }
  }
`;

const Table = styled.table`
  width: 570px;
  margin: auto;
  border-collapse: collapse;

  tr {
    td,
    th {
      text-align: center;
      font-size: 12px;
      padding: 0.3em;
      border: 1px solid black;

      .item-row {
        text-align: left;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5em;
      }

      .item-last-row {
        text-align: right;
        margin-right: 0.5em;
      }
    }

    &:last-child {
      text-align: right;
    }
  }
`;
