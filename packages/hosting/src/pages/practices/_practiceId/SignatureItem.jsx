import React from "react";
import styled from "styled-components";
import { fullName } from "../../../utils";
import { BusinessPosition } from "../../../data-list";

export const SignatureItem = ({
  supervisor,
  representativeCompany,
  practitioner,
  annex2,
  annex3,
  annex4,
}) => {
  const businessPositionValue = BusinessPosition.find(
    (position) =>
      representativeCompany?.companyRepresentativeData?.businessPosition ===
      position.value
  )?.label;

  return (
    <>
      <Container>
        {annex2 && (
          <div className="signatures">
            <div className="firm1">
              <strong>Supervisor(a) de Prácticas IESTP &quot;GLBR&quot;</strong>
              <br />
              <span className="capitalize">{fullName(supervisor)}</span>
            </div>
            <div className="firm2">
              <strong>Representante de la Empresa</strong>
              <br />
              <span className="capitalize">
                {fullName(representativeCompany)}
              </span>
              <br />
              <span className="capitalize">{businessPositionValue}</span>
            </div>
          </div>
        )}
        {annex3 && (
          <div className="signatures">
            <div className="first">
              <div className="firm1">
                <strong>
                  Supervisor(a) de Prácticas IESTP &quot;GLBR&quot;
                </strong>
                <br />
                <span className="capitalize">{fullName(supervisor)}</span>
              </div>
              <div className="firm2">
                <strong>Practicante</strong>
                <br />
                <span className="capitalize">{fullName(practitioner)}</span>
              </div>
            </div>
            <div className="third">
              <div className="firm3">
                <strong>
                  Firma y Sello del Jefe Inmediato del practicante de la Empresa
                </strong>
                <br />
                <span className="capitalize">
                  {fullName(supervisor)} - {businessPositionValue}
                </span>
              </div>
            </div>
          </div>
        )}

        {annex4 && (
          <div className="signatures">
            <div className="firm1">
              Firma y Sello del Representante de la Empresa
              <br />
              <span className="capitalize">
                <strong>
                  {fullName(representativeCompany)} - {businessPositionValue}
                </strong>
              </span>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  font-size: 13px;
  margin-top: 8em;

  .capitalize {
    text-transform: capitalize;
  }
`;
