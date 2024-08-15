import React from "react";
import styled from "styled-components";
import { fullName } from "../../../utils";
import { BusinessPosition, Roles } from "../../../data-list";
import { Col } from "../../../components";
import { Firma } from "../../../images";
import { Image } from "antd";

export const SignatureItem = ({
  practitioner,
  representativeCompany,
  supervisor,
}) => {
  const _roleCode =
    practitioner?.roleCode ||
    representativeCompany?.roleCode ||
    supervisor?.roleCode;

  const rolValue = Roles.find((rol) => rol.code === _roleCode)?.name;

  const businessPositionValue = BusinessPosition.find(
    (position) =>
      representativeCompany?.companyRepresentativeData?.businessPosition ===
      position.value
  )?.label;

  return (
    <>
      <Container>
        <Col span={24}>
          <Image src={Firma} alt="firma" width={200} />
          <div className="firm">
            <span className="capitalize">
              {rolValue === "Usuario" ? "Practicante" : rolValue}
            </span>
            <br />
            <span className="capitalize">
              {fullName(practitioner || representativeCompany || supervisor)}
            </span>
            <br />
            <span className="capitalize">{businessPositionValue}</span>
          </div>
        </Col>
      </Container>
    </>
  );
};

const Container = styled.div`
  font-size: 13px;
  display: grid;
  text-align: center;
  width: 100%;
  margin-top: 1em;

  .firm {
    padding-top: 0.2em;
    margin: auto;
    width: 90%;
    border-top: 2px solid #000000;
  }
  .capitalize {
    text-transform: capitalize;
  }
`;
