import React from "react";
import styled from "styled-components";

export const SignatureItem = ({
  signaturePhoto = null,
  fullName = "",
  businessPosition = null,
  role = "",
  size = 14,
}) => {
  return (
    <Container size={size}>
      {signaturePhoto ? (
        <img src={signaturePhoto} alt="signature" width={200} height={80} />
      ) : (
        <div className="signature-img"></div>
      )}
      <div className="firm">
        <div>
          <span className="capitalize strong">
            {role === "Usuario" ? "Practicante" : role}
          </span>
        </div>
        <div>
          <div>
            <span className="capitalize">{fullName}</span>
          </div>
          {businessPosition && (
            <div>
              <span className="capitalize strong">{businessPosition}</span>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 1em;
  font-size: ${({ size }) => `${size}px`};

  .signature-img {
    width: auto;
    height: 4em;
  }

  .firm {
    padding-top: 0.5em;
    margin: auto;
    width: 90%;
    border-top: 0.2em solid #000000;
    display: grid;
    gap: 0.5em;
    font-size: 1em;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .strong {
    font-weight: 700;
  }
`;
