import React from "react";
import { LogoGilda } from "../../../../../images";
import styled from "styled-components";

export const PracticesSheet1 = ({ practice, practitioner }) => {
  return (
    <>
      <Container>
        <h2>INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO</h2>
        <h1 style={{ textDecoration: "underline" }}>
          &quot;GILDA LILIANA BALLIVIÁN ROSADO&quot;
        </h1>
        <img src={LogoGilda} alt="" style={{ margin: "40px" }} />
        <Career>
          <h2>AREA ACADÉMICA PROFESIONAL</h2>
          <h2>COMPUTACIÓN E INFORMÁTICA</h2>
        </Career>
        <h3 style={{ marginTop: "10px", marginBottom: "50px" }}>
          CARPETA DE PRACTICAS PRE PROFESIONALES
        </h3>
        <Details>
          <div className="atributes">
            <h4>ESTUDIANTE</h4>
            <h4>CÓDIGO DE MATRÍCULA</h4>
            <h4>TURNO</h4>
            <h4>AÑO DE INGRESO</h4>
          </div>
          <div className="info">
            <h4>
              :&nbsp;
              <span className="capitalize">
                {`${practitioner.paternalSurname} ${practitioner.maternalSurname} ${practitioner.firstName}`}
              </span>
            </h4>
            <h4>: 20192939</h4>
            <h4>: DIURNO</h4>
            <h4>: 2023</h4>
          </div>
        </Details>
        <h1 style={{ fontSize: "60px" }}>{new Date().getFullYear()}</h1>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding-top: 3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    font-weight: 400;
    text-align: center;
  }

  > h1 {
    font-size: xx-large;
  }
`;

const Details = styled.div`
  width: 580px;
  display: flex;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 50px;

  .atributes {
    margin-right: 40px;
  }

  .info {
    .capitalize {
      text-transform: capitalize;
    }
  }
`;
const Career = styled.div`
  padding: 1em;
  margin: 1em;
  border: 3px solid #000;
  width: 470px;
  border-left: none;
  border-right: none;
`;
