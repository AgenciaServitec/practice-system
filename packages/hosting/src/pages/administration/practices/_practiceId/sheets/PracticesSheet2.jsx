import React from "react";
import { LogoServitec, QR } from "../../../../../images";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export const PracticesSheet2 = ({ practice, practitioner, company }) => {
  return (
    <>
      <Container>
        <div className="images">
          <div className="images__servitec">
            <img src={LogoServitec} alt="" />
          </div>
          <div className="images__qr">
            <img src={QR} alt="" />
          </div>
        </div>

        <div className="header">
          <div className="header__title">
            <h3>REPRESENTANTE LEGAL DE LA EMPRESA</h3>
            <h3>SERVITEC PERU GROUP E.I.R.L.</h3>
          </div>
          <div className="header__legend">
            <h4>
              &quot;AÑO DEL BICENTENARIO, DE LA CONSOLIDACIÓN DE NUESTRA
              INDEPENDENCIA, Y DE LA CONMEMORACIÓN DE LAS HEROICAS BATALLAS DE
              JUNÍN Y AYACUCHO&quot;
            </h4>
          </div>
        </div>
        <div className="body">
          <div className="body__title">
            <h2>CONSTANCIA DE PRÁCTICAS PRE PROFESIONALES</h2>
          </div>
          <div className="body__description">
            <h5>EL QUE SUSCRIBE, HACE CONSTAR LOS SIGUIENTE:</h5>
            <text>
              Que el Sr.&nbsp;
              <span className="capitalize">
                <strong>
                  {`${practitioner.paternalSurname} ${practitioner.maternalSurname} ${practitioner.firstName}`}
                </strong>
              </span>
              , alumno de este Instituto de Educación Superior Tecnológico
              Público “GILDA LILIANA BALLIVIAN ROSADO”, en la Carrera
              Profesional de <strong>Computación e Informática</strong> ha
              realizado satisfactoriamente sus Prácticas Pre-Profesionales,
              referente al{" "}
              <strong>
                MÓDULO N°{`${practice.moduleNumber}`}: {`${practice.name}`}, con
                un total de {`${practice.hours}`} horas
              </strong>
              , efectuadas en el periodo del{" "}
              {moment(practice.startDate, "DD/MM/YYYY").format(
                "DD [de] MMMM [del] YYYY"
              )}
              &nbsp;al&nbsp;
              {moment(practice.endDate, "DD/MM/YYYY").format(
                "DD [de] MMMM [del] YYYY"
              )}
              .<p></p>
              Se expide la presente constancia a solicitud del interesado, para
              los fines que estime conveniente.{" "}
            </text>
          </div>
          <div className="body__date">
            <span>Chorrillos,&nbsp;{moment().format("DD MMMM YYYY")}</span>
          </div>
        </div>
        <div className="footer">
          <div className="footer__firma">
            <text>
              <strong>Firme y Sello del representante de la Empresa </strong>
            </text>
            <text>Ing. Roberto Alcides Mendoza Perca</text>
          </div>
          <div className="footer__company">
            <span>
              <strong>
                Av. Defensores del Morro (ex. Huaylas) 1350 N° 266 Chorrillos -
                Lima{" "}
              </strong>
            </span>
            <span>
              <FontAwesomeIcon icon={faPhone} />
              &nbsp; &nbsp;
              <strong>941934829 / 923849242 </strong>
            </span>
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp; &nbsp;
              <strong>gerencia@servitecperu.com </strong>
            </span>
            <span>
              <FontAwesomeIcon icon={faEarthAmerica} />
              &nbsp; &nbsp;
              <strong>www.servitec-peru.com </strong>
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  .images {
    display: flex;

    img {
      width: 100%;
      height: 100%;
    }
    &__servitec {
      width: 300px;
      height: 140px;
      margin-right: 22em;
    }
    &__qr {
      align-content: flex-end;
      width: 100px;
      height: 100px;
    }
  }

  .header {
    margin-bottom: 70px;
    &__title {
      text-align: center;
      h3 {
        margin: 0;
      }
    }
    &__legend {
      margin-top: 2em;
      text-align: center;
    }
  }

  .body {
    margin-bottom: 7em;
    &__title {
      text-align: center;
      margin-bottom: 2em;
    }

    &__description {
      text-align: justify;
      width: 45em;
      margin: auto;

      > h5 {
        margin-bottom: 1em;
      }
      > text {
        font-size: medium;
        line-height: 1.5em;
      }

      .capitalize {
        text-transform: capitalize;
      }
    }
    &__date {
      text-align: center;
      margin-top: 4em;
      margin-bottom: 4em;
    }
  }

  .footer {
    &__firma {
      margin: auto;
      text-align: center;
      width: 326px;
      border-top: 3px solid #000;
      padding-top: 1em;
    }
    &__company {
      height: 300px;
      padding: 1em;
      width: auto;
      background: darkgrey;
      margin-top: 6em;
      text-align: center;
      display: flex;
      flex-direction: column;
      line-height: 120%;
    }
  }
`;
