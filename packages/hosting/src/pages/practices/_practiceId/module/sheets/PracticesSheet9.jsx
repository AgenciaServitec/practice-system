import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { findRole, fullName } from "../../../../../utils";
import { SignatureItem } from "../../SignatureItem";

export const PracticesSheet9 = ({ practice, supervisor, annex3 }) => (
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
        <div className="body__datacompany">
          <div>
            <strong>
              7. Aspectos desarrollados referente al módulo del Plan Curricular:{" "}
            </strong>
            <p className="capitalize practice-task">{practice.task}</p>
          </div>
          <div className="body__final">
            <ul>
              <li>
                Habiendo verificado que el estudiante si ha practicado, informo
                a la Jefatura de Área Académica de la carrera de: Computación e
                Informática para los fines pertinentes.
              </li>
              <li>Adjunto fichas de Supervisión de los siguientes módulos:</li>
              <li>
                ANEXO 2: Ficha de aceptación de prácticas pre-profesional.
              </li>
              <li>
                ANEXO 3: Ficha de supervisión y monitoreo de prácticas
                pre-profesionales.
              </li>
              <li>
                ANEXO 4: Informe valorativo de evaluación de prácticas
                pre-profesionales.
              </li>
              <li>Copia de DNI</li>
              <li>Ubicación de la empresa en Google maps</li>
              <li>Copia de los espacios de la institución</li>
              <li>Copia de ficha de matrícula</li>
            </ul>
          </div>
          <div className="body__observations">
            <span>
              <strong>Observaciones:</strong>
            </span>
            <br />
            <span>
              {annex3?.observations || "No hay observaciones hacia el alumno."}
            </span>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer__atempt">
          <span>Atentamente</span>
        </div>
        <div className="firma">
          <SignatureItem
            signaturePhoto={
              practice.status === "approved"
                ? supervisor?.signaturePhoto?.url
                : null
            }
            fullName={fullName(supervisor)}
            role={findRole(supervisor?.roleCode)?.name}
          />
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
    margin-bottom: 2em;
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

      .practice-task {
        margin-top: 1rem;
        font-size: 1.2rem;
      }

      ul {
        list-style: none;
        line-height: 1.5;
        display: flex;
        flex-direction: column;
      }
    }

    &__final {
      width: 550px;
      font-size: 14px;
    }

    &__observations {
      line-height: 1.8em;
    }
  }

  .footer {
    text-align: center;

    .firma {
      padding-top: 0.5em;
      width: 50%;
      margin: auto;
    }

    &__tip {
      padding-top: 2em;
      width: 570px;
      margin: auto;
      text-align: justify;
    }
  }
`;
