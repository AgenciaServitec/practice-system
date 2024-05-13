import React from "react";
import { LogoGilda } from "../../../../images";
import styled from "styled-components";

export const PdfRegistrationPractices = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Container>
        <h2>INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO</h2>
        <h2 style={{ textDecoration: "underline" }}>
          &quot;GILDA LILIANA BALLIVIÁN ROSADO&quot;
        </h2>
        <img src={LogoGilda} alt="" style={{ margin: "40px" }} />
        <Career>
          <h2>AREA ACADÉMICA PROFESIONAL</h2>
          <h2>COMPUTACIÓN E INFORMÁTICA</h2>
        </Career>
        <h3 style={{ marginTop: "10px", marginBottom: "50px" }}>
          CARPETA DE PRACTICAS PRE PROFESIONALES
        </h3>
        <Details>
          <h4>ESTUDIANTE:</h4>
          <h4>CÓDIGO DE MATRÍCULA:</h4>
          <h4>TURNO:</h4>
          <h4>AÑO DE INGRESO:</h4>
        </Details>
        <h1 style={{ fontSize: "60px" }}>{currentYear}</h1>
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > h2 {
    font-weight: 500;
    text-align: center;
  }
`;

const Details = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
  margin-bottom: 50px;
`;
const Career = styled.div`
  padding: 1em;
  border: 3px solid #000;
  width: 470px;
  border-left: none;
  border-right: none;
`;
