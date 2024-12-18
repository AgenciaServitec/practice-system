import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";

export const PracticesSheet11 = ({ company }) => {
  return (
    <Container>
      <div className="header">
        <div className="header__gilda">
          <img src={LogoGilda} alt="Logo Gilda" />
        </div>
        <div className="header__institute">
          <h5>INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO</h5>
          <h5>&quot;GILDA LILIANA BALLIVIÁN ROSADO&quot;</h5>
        </div>
      </div>
      <div className="body">
        <div className="description">
          <h1>CROQUIS DE LA EMPRESA</h1>
          <h2>{company?.socialReason}</h2>
        </div>
        <img src={company?.sketchCompany?.url} alt="Sketch Company" />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .header {
    text-align: center;
    line-height: 1em;
    display: flex;
    margin-bottom: 2em;
    opacity: 0.8;

    &__gilda {
      width: 90px;
      height: 60px;
      margin-right: 3em;
    }

    img {
      max-width: 100%;
      height: auto;
    }
  }

  .body {
    text-align: center;
    margin-top: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4em;

    .description {
      text-transform: uppercase;

      * {
        margin: 0;
        padding: 0;
      }
    }
  }
`;
