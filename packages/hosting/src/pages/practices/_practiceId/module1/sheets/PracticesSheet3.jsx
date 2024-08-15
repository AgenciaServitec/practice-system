import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { fullName, getBusinessPosition } from "../../../../../utils";
import dayjs from "dayjs";
import { SignatureItem } from "../../SignatureItem";

export const PracticesSheet3 = ({
  practitioner,
  practice,
  company,
  representativeCompany,
  supervisor,
  annex2,
  annexNumber,
}) => {
  return (
    <>
      <Container id="annex2">
        <div className="header">
          <div className="header__gilda">
            <img src={LogoGilda} alt="gilda logo" />
          </div>
          <div className="header__institute">
            <h5>INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO</h5>
            <h5>&quot;GILDA LILIANA BALLIVIÁN ROSADO&quot;</h5>
          </div>
        </div>
        <div className="body">
          <div
            className={`body__title ${
              annexNumber === "annex2" && "annex2-title"
            }`}
          >
            <h3>ANEXO 2</h3>
            <h4>FICHA DE ACEPTACIÓN DE PRÁCTICAS PRE - PROFESIONALES</h4>
          </div>
          <div className="body__subtitle1">
            <h5>1. DATOS DE LA EMPRESA O INSTITUCIÓN</h5>
          </div>
          <div className="body__datacompany">
            <ul>
              <li>
                Razón Social de la Empresa:{" "}
                <strong className="capitalize">{company.socialReason}</strong>
              </li>
              <li>
                Distrito:{" "}
                <strong className="capitalize">{company.district}</strong>
              </li>
              <li>
                Dirección:{" "}
                <strong className="capitalize">{company.address}</strong>
              </li>
              <li>
                Teléfono:{" "}
                <strong className="capitalize">{`${
                  representativeCompany?.phone?.prefix || ""
                } ${representativeCompany?.phone?.number || ""}`}</strong>
              </li>
              <li>
                Nombre del encargado del control de Prácticas Pre-Profesonales:{" "}
                <strong className="capitalize">
                  {fullName(representativeCompany)}
                </strong>
              </li>
              <li>
                Cargo:{" "}
                <strong className="capitalize">
                  {getBusinessPosition(
                    representativeCompany?.companyRepresentativeData
                      ?.businessPosition
                  )?.label || ""}
                </strong>
              </li>
            </ul>
          </div>
          <div className="body__subtitle2">
            <h5>2. DATOS DEL PRACTICANTE</h5>
          </div>
          <div className="body__datastudent">
            <ul>
              <li>
                Apellidos y Nombres:{" "}
                <strong className="capitalize">{fullName(practitioner)}</strong>
              </li>
              <li>
                Carrera Profesional:{" "}
                <strong className="capitalize">
                  Computación e Informática
                </strong>
              </li>
            </ul>
            <ul className="row-list">
              <li>
                Turno:{" "}
                <strong className="capitalize">
                  {practitioner?.practitionerData?.studentShift || "Egresado"}
                </strong>
              </li>
              <li>
                Semestre:{" "}
                <strong className="capitalize">
                  {practitioner?.practitionerData?.semester || "Egresado"}
                </strong>
              </li>
            </ul>
          </div>
          <div className="body__subtitle3">
            <h5>3. LA EMPRESA O INSTITUCIÓN OFRECE LO SIGUIENTE</h5>
          </div>
          <div className="body__company">
            <ul>
              <li>
                Período de la práctica:
                <strong>
                  &nbsp;del&nbsp;
                  {dayjs(practice.startDate, "DD/MM/YYYY").format(
                    "DD [de] MMMM [del] YYYY"
                  )}
                  &nbsp;al&nbsp;
                  {dayjs(practice.endDate, "DD/MM/YYYY").format(
                    "DD [de] MMMM [del] YYYY"
                  )}
                </strong>
              </li>
              <li>
                Horario:{" "}
                <strong className="capitalize">
                  {dayjs(practice.entryTime, "HH:mm:ss").format("HH:mm")} -{" "}
                  {dayjs(practice.departureTime, "HH:mm:ss").format("HH:mm")}
                </strong>
              </li>
              <li>
                Dpto. Sector o Área de las Prácticas:{" "}
                <strong className="capitalize">{practice?.practiceArea}</strong>
              </li>
              <li>Refrigerio: {annex2?.refreshment || `-`}</li>
              <li>Movilidad: {annex2?.mobility || `-`}</li>
              <li>Otros: {annex2?.others || `-`}</li>
            </ul>
          </div>
          <div className="body__date">
            <span>Chorrillos, {dayjs().format("DD MMMM YYYY")}</span>
          </div>
        </div>
        <div className="firm">
          <SignatureItem supervisor={supervisor} />
        </div>
        <div className="note">
          <span>
            <strong>NOTA: </strong>Entregar por mesa de partes la ficha sellada
            y firmada por la Empresa, para su registro en el libro de Prácticas
            Pre - Profesionales.
          </span>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  .capitalize {
    text-transform: capitalize;
  }

  .header {
    text-align: center;
    line-height: 1em;
    display: flex;
    margin-bottom: 1em;
    opacity: 0.8;

    img {
      width: 100%;
      height: 100%;
    }

    &__gilda {
      width: 90px;
      height: 60px;
      margin-right: 3em;
    }
  }
  .body {
    margin-bottom: 7em;

    &__title {
      margin-bottom: 2em;
      text-align: center;
      h3 {
        text-decoration: underline;
        text-decoration-color: black;
      }
    }

    &__subtitle1,
    &__subtitle2,
    &__subtitle3 {
      width: 605px;
      margin: auto;
    }
    &__datacompany,
    &__company {
      width: 570px;
      margin: auto;

      ul {
        list-style: none;
        line-height: 1.5em;
      }
    }
    &__datastudent {
      width: 570px;
      margin: auto;

      ul {
        list-style: none;
        line-height: 1.5em;
        margin: 0;
      }
      .row-list {
        display: flex;
        gap: 4em;
        margin-bottom: 1em;
      }
    }
    &__date {
      margin: auto;
      width: 570px;
      text-align: end;
      padding-top: 2em;
    }
  }
  .firm {
    width: 60%;
    margin: auto;
  }

  .note {
    padding-top: 3em;
    text-align: justify;
    width: 605px;
    margin: auto;
  }
`;
