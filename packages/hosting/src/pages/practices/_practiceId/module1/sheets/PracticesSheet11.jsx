import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { ShowStaticMap } from "../../../../../components/ui/showStaticMap";

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
      </div>{" "}
      <div className="body">
        <ShowStaticMap address={company?.address} />
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
  }
`;
