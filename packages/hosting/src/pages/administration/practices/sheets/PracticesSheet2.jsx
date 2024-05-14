import React from "react";
import { LogoServitec } from "../../../../images";
import styled from "styled-components";

export const PracticesSheet2 = () => {
  return (
    <>
      <Container>
        <img src={LogoServitec} alt="servitec" />
      </Container>
    </>
  );
};

const Container = styled.div`
  .img {
    width: 50px;
  }
`;
