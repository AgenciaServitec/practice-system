import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../images";

export const PracticesSheet5 = () => {
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
            <h4>INFORME VALORATIVO DE EVALUACIÓN DE PRÁCTICAS PRE -</h4>
            <h4>PROFESIONALES</h4>
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
                  <strong>Aguirre Vizalote Monica Luz </strong>
                </span>
              </li>
              <li>
                <span> 2.</span>
                <span>
                  Carrera Profesional:&nbsp;
                  <strong>Computacion e Informatica </strong>
                </span>
              </li>
              <li>
                <span> 3.</span>
                <span>
                  Modulo Tecnico Profesional N° 1:&nbsp;
                  <strong>
                    Gestion de soporte tecnico, Seguridad y Tecnologia de la
                    informacion y comunicacion
                  </strong>
                </span>
              </li>
              <li>
                <span> 4.</span>
                <span>
                  Duracion de PPP:&nbsp; <strong>320 Horas </strong>
                </span>
              </li>
              <li>
                <span> 5.</span>
                <span>
                  Periodo de Evaluación:&nbsp;
                  <strong>20/06/2023 / 23/09/2023</strong> Total de horas:&nbsp;
                  <strong> 320 Horas</strong>
                </span>
              </li>
              <li>
                <span> 6.</span>
                <span>
                  Nombre de la Empresa o Institución: &nbsp;
                  <br />
                  <strong>LOS INSUMOS GENERALES E.I.R.L</strong>
                  <br />
                </span>
              </li>
              <li>
                <span>7.</span>
                <span>
                  Giro de la Empresa o Institución:&nbsp;
                  <strong>VENTA DE INSUMOS QUIMICOS </strong>
                </span>
              </li>
              <li>
                <span>8.</span>
                <span>
                  Dirección:&nbsp;{" "}
                  <strong>Jr. Daniel Garces 464 Urb. P. Baja</strong>
                </span>
              </li>
              <li>
                <span></span>
                <span>
                  Telefono:&nbsp; <strong>123456789 </strong>
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
                <span>
                  Nombre:&nbsp; <strong>Lozada Yntuscca Orlando Roberto</strong>
                </span>
              </li>
              <li>
                <span></span>
                <span>
                  Cargo:&nbsp; <strong>Administrador </strong>
                </span>
              </li>
              <li>
                <span> 10.</span>
                <span>Lugares de Practica:&nbsp;</span>
              </li>
              <li>
                <span></span>
                <span>
                  <div className="item-grid">
                    <div>
                      Oficina: <strong> X</strong>
                    </div>
                    <div>Taller:</div>
                  </div>
                </span>
              </li>
              <li>
                <span></span>
                <span>
                  <div className="item-grid">
                    <div> Laboratorio:</div>

                    <div>Granja o Campo:</div>
                  </div>
                </span>
              </li>
              <li>
                <span></span>
                <span>
                  <div className="item-grid">
                    <div> Almacen:</div>

                    <div>Otros:</div>
                  </div>
                </span>
              </li>
              <li>
                <span> 11.</span>
                <span>
                  Horario de practicas: <strong>14:00 pm a 20:00 pm </strong>
                </span>
              </li>
              <li>
                <span> 12.</span>
                <span>
                  Tareas asignadas segun el modulo indicado: <br />
                  <br />
                  <div className="task-box">
                    Mantenimiento Preventivo y Correctivo de equipos de Computo
                  </div>
                </span>
              </li>
            </ul>

            <div className="body__subtitle1">
              <h5>II. INSTRUCCIONES PARA LA EVALUACIÓN CUALITATIVA: </h5>
            </div>

            <ul>
              <li>
                <span>1.</span>
                <span className="jutify">
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
          .jutify {
            text-align: justify;
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
      td {
        border: 1px solid black;
        padding: 10px;
      }
    }
  }
`;
