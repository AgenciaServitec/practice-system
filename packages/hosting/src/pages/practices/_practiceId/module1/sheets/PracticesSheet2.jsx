import React from "react";
import { LogoPrimary } from "../../../../../images";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAmerica,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { QRCode } from "antd";
import { findRole, fullName, getBusinessPosition } from "../../../../../utils";
import dayjs from "dayjs";
import { SignatureItem } from "../../SignatureItem";
import { Col } from "../../../../../components";

export const PracticesSheet2 = ({
  practice,
  practitioner,
  company,
  representativeCompany,
}) => {
  return (
    <>
      <Container>
        <div className="images">
          <div className="images__company">
            {company?.logotipoImage && (
              <img src={company?.logotipoImage?.url} alt="" />
            )}
          </div>
          <div className="images__qr">
            <QRCode
              value={`${window.location.href}`}
              icon={LogoPrimary}
              iconSize={30}
              type="svg"
              size={110}
              bordered={false}
            />
          </div>
        </div>

        <div className="header">
          <div className="header__title">
            <h4>REPRESENTANTE LEGAL DE LA EMPRESA</h4>
            <h4>{`${company.socialReason}`}</h4>
          </div>
          <div className="header__legend">
            <h4>
              &quot;AÑO DEL BICENTENARIO, DE LA CONSOLIDACIÓN DE NUESTRA
              INDEPENDENCIA, Y DE LA CONMEMORACIÓN DE LAS HEROICAS BATALLAS DE
              JUNÍN Y AYACUCHO&quot;
            </h4>
          </div>
        </div>
        <div className="body">
          <div className="body__title">
            <h3>CONSTANCIA DE PRÁCTICAS PRE PROFESIONALES</h3>
          </div>
          <div className="body__description">
            <h5>EL QUE SUSCRIBE, HACE CONSTAR LOS SIGUIENTE:</h5>
            <text>
              Que el Sr.&nbsp;
              <span className="capitalize">
                <strong>{fullName(practitioner)}</strong>
              </span>
              , alumno de este Instituto de Educación Superior Tecnológico
              Público “GILDA LILIANA BALLIVIAN ROSADO”, en la Carrera
              Profesional de <strong>Computación e Informática</strong> ha
              realizado satisfactoriamente sus Prácticas Pre-Profesionales,
              referente al{" "}
              <strong>
                MÓDULO N° {practice.moduleNumber} :{" "}
                <span className="capitalize">{practice.name}</span>
              </strong>
              , con un total de <strong>{practice.hours} horas</strong>,
              efectuadas en el periodo del{" "}
              <strong>
                {dayjs(practice.startDate, "DD/MM/YYYY").format(
                  "DD [de] MMMM [del] YYYY"
                )}
              </strong>
              &nbsp;al&nbsp;
              <strong>
                {dayjs(practice.endDate, "DD/MM/YYYY").format(
                  "DD [de] MMMM [del] YYYY"
                )}
              </strong>
              .<p></p>
              Se expide la presente constancia a solicitud del interesado, para
              los fines que estime conveniente.{" "}
            </text>
          </div>
          <div className="body__date">
            <span>Chorrillos, {dayjs().format("DD [de] MMMM [del] YYYY")}</span>
          </div>
        </div>
        <div className="footer">
          <Col span={24} md={12} className="firma">
            <SignatureItem
              signaturePhoto={
                practice.status === "approved"
                  ? representativeCompany?.signaturePhoto?.url
                  : null
              }
              fullName={fullName(representativeCompany)}
              businessPosition={
                getBusinessPosition(
                  representativeCompany.companyRepresentativeData
                    .businessPosition
                )?.label
              }
              role={findRole(representativeCompany.roleCode)?.name}
            />
          </Col>
          <div className="footer__company">
            <span className="address">
              <strong>{`${company?.address}`}</strong>
            </span>
            <span>
              <FontAwesomeIcon icon={faPhone} />
              &nbsp; &nbsp;
              <strong>{`${representativeCompany?.phone?.prefix} ${representativeCompany?.phone?.number}`}</strong>
            </span>
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              &nbsp; &nbsp;
              <strong>{`${company?.email}`}</strong>
            </span>
            <span>
              <FontAwesomeIcon icon={faEarthAmerica} />
              &nbsp; &nbsp;
              <strong>{`${company?.webSite}`}</strong>
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  .capitalize {
    text-transform: capitalize;
  }

  .images {
    width: 100%;
    display: flex;
    gap: 30em;

    img {
      width: 100%;
      height: 100%;
    }
    &__company {
      width: 11em;
      height: auto;
      padding: 0.5em;
      object-fit: contain;
    }
    &__qr {
      width: 100px;
      height: 100px;
    }
  }

  .header {
    margin-bottom: 70px;
    &__title {
      text-align: center;
      text-transform: uppercase;
      h4 {
        margin: 0;
      }
    }
    &__legend {
      margin-top: 2em;
      text-align: center;
    }
  }

  .body {
    margin-bottom: 5.5em;
    &__title {
      text-align: center;
      margin-bottom: 2em;
    }

    &__description {
      text-align: justify;
      width: 45em;
      margin: auto;

      > h5 {
        margin-bottom: 1em;
      }
      > text {
        font-size: medium;
        line-height: 1.5em;
      }

      .capitalize {
        text-transform: capitalize;
      }
    }
    &__date {
      text-align: center;
      margin-top: 4em;
    }
  }

  .footer {
    .firma {
      margin: auto;
    }

    &__company {
      height: auto;
      padding: 0.5em;
      width: auto;
      background: #ededed;
      margin-top: 2em;
      text-align: center;
      display: flex;
      flex-direction: column;
      line-height: 140%;

      .address {
        text-transform: capitalize;
      }
    }
  }
`;
