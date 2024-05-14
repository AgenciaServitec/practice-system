import React from "react";
import { LogoServitec } from "../../../../images";
import styled from "styled-components";

export const PracticesSheet2 = () => {
  // Obtener la fecha
  const currentDate = new Date();
  // Formatear la fecha
  const formattedDate = currentDate.toLocaleDateString("es-PE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <Container>
        <img src={LogoServitec} alt="servitec" />
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
              Que el Sr. <strong>García Chillcce Litman Ever</strong>, alumno de
              este Instituto de Educación Superior Tecnológico Público “GILDA
              LILIANA BALLIVIAN ROSADO”, en la Carrera Profesional de
              <strong>Computación e Informática</strong> ha realizado
              satisfactoriamente sus Prácticas Pre-Profesionales, referente al{" "}
              <strong>
                MÓDULO N°1: Gestión de soporte técnico, seguridad y tecnologías
                de la información y comunicación, con un total de 276 horas
              </strong>
              , efectuadas en el periodo del 02 de septiembre del 2022 al 11 de
              noviembre del 2022.
              <p></p>
              Se expide la presente constancia a solicitud del interesado, para
              los fines que estime conveniente.{" "}
            </text>
          </div>
        </div>
        <div className="footer">
          <div className="footer__date">
            <text>Chorrillos,{formattedDate}</text>
          </div>
        </div>
      </Container>
    </>
  );
};

const Description = styled.div``;

const Container = styled.div`
  img {
    width: 320px;
    height: 130px;
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
    margin-bottom: 4em;
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
    }
    .footer {
      text-align: center;
      &__date {
        width: 45em;
        margin: auto;
      }
    }
  }
`;
