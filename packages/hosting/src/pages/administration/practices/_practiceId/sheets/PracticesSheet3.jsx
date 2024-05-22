import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import moment from "moment";

export const PracticesSheet3 = () => {
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
            <h3>ANEXO 2</h3>
            <h4>FICHA DE ACEPTACIÓN DE PRÁCTICAS PRE - PROFESIONALES</h4>
          </div>
          <div className="body__subtitle1">
            <h5>1. DATOS DE LA EMPRESA O INSTITUCIÓN</h5>
          </div>
          <div className="body__datacompany">
            <ul>
              <li>Razón Social de la Empresa:</li>
              <li>Dirección:</li>
              <li>Distrito:</li>
              <li>Teléfono:</li>
              <li>
                Nombre del encargado del control de Prácticas Pre-Profesonales:
              </li>
              <li>Cargo:</li>
            </ul>
          </div>
          <div className="body__subtitle2">
            <h5>2. DATOS DEL PRACTICANTE</h5>
          </div>
          <div className="body__datastudent">
            <ul>
              <li>Apellidos y Nombres:</li>
              <li>Carrera Profesional:</li>
            </ul>
            <ul className="row-list">
              <li>Turno:</li>
              <li>Semestre:</li>
              <li>Año Académico:</li>
            </ul>
          </div>
          <div className="body__subtitle3">
            <h5>3. LA EMPRESA O INSTITUCIÓN OFRECE LO SIGUIENTE</h5>
          </div>
          <div className="body__company">
            <ul>
              <li>Período de la práctica:</li>
              <li>Horario:</li>
              <li>Dpto. Sector o Área de las Prácticas:</li>
              <li>Refrigerio:</li>
              <li>Movilidad:</li>
              <li>Otros:</li>
            </ul>
          </div>
          <div className="body__date">
            <span>Chorrillos,{moment().format("DD MMMM YYYY")}</span>
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
        <div className="note">
          <span>
            <strong>NOTA: </strong>Entregar por mesa de partes la ficha sellada
            y firmada por la Empresa, para su registro en el libro de Prácticas
            Pre - Profesionales.
          </span>
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
      }
    }
    &__datastudent {
      width: 570px;
      margin: auto;

      ul {
        list-style: none;
        line-height: 1.5em;
        margin: 0;
      }
      .row-list {
        display: flex;
        gap: 8em;
        margin-bottom: 1em;
      }
    }
    &__date {
      margin: auto;
      width: 570px;
      text-align: end;
      padding-top: 2em;
    }
  }
  .footer {
    display: flex;
    width: 605px;
    margin: auto;
    gap: 2em;
    padding-top: 9em;
    &__firm1 {
      padding-top: 1em;
      border-top: 3px solid #000;
      width: 289px;
      text-align: center;
    }
    &__firm2 {
      padding-top: 1em;
      border-top: 3px solid #000;
      width: 289px;
      text-align: center;
    }
  }
  .note {
    padding-top: 3em;
    text-align: justify;
    width: 605px;
    margin: auto;
  }
`;
