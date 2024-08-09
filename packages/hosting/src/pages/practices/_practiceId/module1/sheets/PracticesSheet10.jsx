import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";

export const PracticesSheet10 = ({ practitioner }) => {
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
      </div>{" "}
      <div className="body">
        <div className="body__frontDNI">
          <img src={practitioner.frontDniPhoto.url} alt="Front DNI" />
        </div>
        <div className="body__backDNI">
          <img src={practitioner.backDniPhoto.url} alt="Front DNI" />
        </div>
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
    margin-top: 10em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6em;

    &__frontDNI,
    &__backDNI {
      width: 318px;
      height: 198px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
`;
