import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { fullName } from "../../../../../utils";
import { BusinessPosition, PracticeArea } from "../../../../../data-list";
import dayjs from "dayjs";

export const PracticesSheet8 = ({
  practice,
  company,
  supervisor,
  representativeCompany,
}) => {
  const BusinessPositionValue = BusinessPosition.find(
    (position) =>
      position.value ===
      representativeCompany?.companyRepresentativeData?.businessPosition
  )?.label;

  return (
    <>
      <Container>
        <div className="header">
          <div className="header__gilda">
            <img src={LogoGilda} alt="" />
          </div>
          <div className="header__institute">
            <h5>INSTITUTO DE EDUCACIÓN SUPERIOR TECNOLÓGICO PÚBLICO</h5>
            <h5>&quot;GILDA LILIANA BALLIVIÁN ROSADO&quot;</h5>
          </div>
        </div>
        <div className="body">
          <div className="body__subtitle1">
            <h5>II. DATOS DE LA EMPRESA: </h5>
          </div>
          <div className="body__datacompany">
            <ol>
              <li>
                <div>
                  <span>
                    Razón Social de la Empresa, Institución o Centro de
                    Prácticas:
                  </span>
                  <span className="capitalize">
                    &quot;{company?.socialReason}&quot;
                  </span>
                </div>
              </li>
              <li>
                <span>Dirección: </span>
                <span className="capitalize">{company?.address}</span>
              </li>
              <li>
                <span>Distrito: </span>
                <span>{company.district}</span>
              </li>
              <li>
                <span>Ciudad: </span>
                <span>{company.province}</span>
              </li>
              <li>
                <span>Región: </span>
                <span>{company.region}</span>
              </li>
              <li>
                <span>Teléfono: </span>
                <span>{representativeCompany?.phone?.number || "-"}</span>
              </li>
              <li>
                <span>Correo electrónico (e-mail): </span>
                <span>{company.email}</span>
              </li>
              <li>
                <span>Página web: </span>
                <span>{company.webSite}</span>
              </li>
              <li>
                <span>R.U.C: </span>
                <span>{company.ruc}</span>
              </li>
              <li>
                <div>
                  <span>
                    Nombre y Apellidos del Jefe o Autoridad principal de la
                    Empresa o Institución:
                  </span>
                  <span className="capitalize">
                    {fullName(representativeCompany)}
                  </span>
                </div>
              </li>
              <li>
                <div>
                  <span>
                    Cargo de la Autoridad principal de la Empresa o Institución:
                  </span>
                  <span>Gerente General</span>
                </div>
              </li>
              <li>
                <div>
                  <span>
                    Cargo del Jefe o Supervisor de Práctica Pre-profesional
                    designado por la empresa:
                  </span>
                  <span className="capitalize">{BusinessPositionValue}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>
                    Nombre y Apellidos del Docente-Supervisor de Práctica
                    designado por el IESTP &quot;GLBR&quot;:
                  </span>
                  <span className="capitalize">{fullName(supervisor)}</span>
                </div>
              </li>
              <li>
                <div>
                  <span>
                    Rubro y Actividad que realiza la Empresa o Institución:
                    Descripción de los productos o servicios que ofrece.
                  </span>
                  <span className="capitalize">{company.category}</span>
                </div>
              </li>
            </ol>
          </div>
          <div className="body__subtitle1">
            <h5>III. DATOS DE LA PRÁCTICA PRE-PROFESIONAL: </h5>
          </div>
          <div className="body__datacompany">
            <ol>
              <li>
                <span>Módulo del Plan Curricular Vinculado: </span>
                <span className="capitalize">
                  N° {practice.moduleNumber} | {practice.name}
                </span>
              </li>
              <li>
                <div>
                  <span>
                    Funciones y/o tareas asignadas de acuerdo al módulo:{" "}
                  </span>
                  <p className="capitalize">{practice.task}</p>
                </div>
              </li>
              <li>
                <span>Total, de horas acumuladas: </span>
                <span>{practice.hours} horas</span>
              </li>
              <li>
                <span>Período de ejecución de la práctica: </span>
                <span>
                  del{" "}
                  <span className="capitalize">
                    {dayjs(practice.startDate, "DD/MM/YYYY").format("LL")}{" "}
                  </span>{" "}
                  al &nbsp;
                  <span className="capitalize">
                    {dayjs(practice.endDate, "DD/MM/YYYY").format("LL")}{" "}
                  </span>{" "}
                </span>
              </li>
              <li>
                <span>Horario de Prácticas: </span>
                <span>
                  {`${dayjs(practice.entryTime, "HH:mm:ss").format(
                    "HH:mm"
                  )} - ${dayjs(practice.departureTime, "HH:mm:ss").format(
                    "HH:mm"
                  )}`}
                </span>
              </li>
              <li>
                <span>Lugar de práctica: </span>
                <div className="table_center_work">
                  {Object.entries(PracticeArea).map(([key, object]) => (
                    <div key={key}>
                      {object.name}:{" "}
                      {key === practice?.practiceArea ? "x" : " - "}
                    </div>
                  ))}
                </div>
              </li>
            </ol>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  font-size: 14px;

  .header {
    text-align: center;
    line-height: 1em;
    display: flex;
    margin-bottom: 2em;
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

      ol {
        line-height: 1.5;

        li {
          & > span:first-child {
            font-weight: 700;
          }

          div {
            display: flex;
            flex-direction: column;

            & > span:first-child {
              font-weight: 700;
            }

            p {
              font-size: 1.2rem;
            }
          }
        }
      }

      .table_center_work {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }
    }
  }

  .
`;
