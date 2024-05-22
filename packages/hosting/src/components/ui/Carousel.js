import React from "react";
import { CarouselAntd } from "./index";
import styled from "styled-components";

export const Carousel = ({ images = [] }) => {
  return (
    <Container autoplay dots={false} fade>
      {images.map((image, index) => (
        <div key={index} className="carousel-img">
          <img src={image} alt="" />
        </div>
      ))}
    </Container>
  );
};

const Container = styled(CarouselAntd)`
  .carousel-img {
    img {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }
  }
`;
