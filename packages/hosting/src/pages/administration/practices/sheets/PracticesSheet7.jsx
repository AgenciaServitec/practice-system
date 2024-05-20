import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../images";

export const PracticesSheet7 = () => {
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
              San Juan de Miraflores, 15 de Noviembre del 2023
            </div>
            <h4>INFORME N° 001 - 2023 - ELS – CI - IESTP &quot;GLBR&quot;</h4>
            <div className="lbody__title">
              <div className="vertical-align">
                <p>SEÑOR(A):</p>
                <p>Ing. Gutiérrez Barahona José</p>
                <p>
                  <strong>
                    {" "}
                    COORDINADOR DEL ÁREA ACADÉMICA DE COMPUTACIÓN E INFORMÁTICA
                    DEL IESTP
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
                <p>Estudiante: Aguirre Vizalote Mónica Luz</p>
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
              efectuadas por la estudiante Aguirre Vizalote Mónica Luz como a
              continuación detallo:
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
                  Aguirre Vizalote Monica Luz
                </span>
              </li>
              <li>
                <span>
                  <strong> 2. </strong>
                </span>
                <span>
                  <strong> Carrera profesional:</strong> <br />
                  Computación e Informática
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
                  N° 1 Gestión de Soporte Técnico, Seguridad y Gestión de
                  Soporte Técnico de la Información y Comunicación
                </span>
              </li>
              <li>
                <span>
                  <strong> 4. </strong>
                </span>
                <span>
                  <strong>
                    Periodo de estudios (año de ingreso-año de egreso)
                  </strong>
                  <br />
                  Abril 2021 - Actualidad
                </span>
              </li>
              <li>
                <span>
                  <strong> 5. </strong>
                </span>
                <span>
                  <strong>Domicilio: </strong>
                  <br />
                  Jr. Daniel Garcés 464 Urb. P. Baja San juan de Miraflores
                </span>
              </li>
              <li>
                <span>
                  <strong> 6. </strong>
                </span>
                <span>
                  <strong>Teléfonos (domicilio-personal): </strong>
                  <br />
                  938655592
                </span>
              </li>
              <li>
                <span>
                  <strong> 7. </strong>
                </span>
                <span>
                  <strong>Correo electrónico (e-mail)</strong>
                  <br />
                  monicaaguirrevizalote18@gmail.com
                </span>
              </li>
              <li>
                <span>
                  <strong> 8. </strong>
                </span>
                <span>
                  <strong>DNI: </strong>
                  61876029
                </span>
              </li>
              <li>
                <span>
                  <strong> 9. </strong>
                </span>
                <span>
                  <strong>Código de matrícula: </strong>
                  2021039
                </span>
              </li>
              <li>
                <span>
                  <strong> 10.</strong>
                </span>
                <span>
                  <div className="item-grid">
                    <div>
                      <strong>Semestre: </strong>VI
                    </div>
                    <div>
                      {" "}
                      <strong>Turno: </strong>Diurno
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
                  del 20 de Junio al 23 de Setiembre del 2022
                </span>
              </li>
              <li>
                <span>
                  <strong> 12. </strong>
                </span>
                <span>
                  <strong>Total, de Horas: </strong>
                  320 horas
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
