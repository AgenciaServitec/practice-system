import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import { fullName } from "../../../../../utils";
import { BusinessPosition } from "../../../../../data-list";

export const PracticesSheet8 = ({
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
            <ul>
              <li>
                <div>1.</div>
                <div>
                  <span>
                    Razón Social de la Empresa, Institución o Centro de
                    Prácticas:
                  </span>
                  <span className="capitalize">
                    {" "}
                    &quot;{company.socialReason}&quot;
                  </span>
                </div>
              </li>
              <li>
                <span>
                  <strong> 2. </strong>
                </span>
                <span className="capitalize">
                  <strong>Dirección: </strong> {company.address}
                </span>
              </li>
              <li>
                <span>
                  <strong> 3. </strong>
                </span>
                <span>
                  <strong>Distrito: </strong> {company.district}
                </span>
              </li>
              <li>
                <span>
                  <strong> 4. </strong>
                </span>
                <span>
                  <strong>Ciudad: </strong> {company.province}
                </span>
              </li>
              <li>
                <span>
                  <strong> 5. </strong>
                </span>
                <span>
                  <strong>Región: </strong> {company.region}
                </span>
              </li>
              <li>
                <span>
                  <strong> 6. </strong>
                </span>
                <span>
                  <strong>Teléfono: </strong>{" "}
                  {`${representativeCompany?.phone?.prefix} ${representativeCompany?.phone?.number}` ||
                    "-"}
                </span>
              </li>
              <li>
                <span>
                  <strong> 7. </strong>
                </span>
                <span>
                  <strong>Fax: </strong> {representativeCompany?.fax || "-"}
                </span>
              </li>
              <li>
                <span>
                  <strong> 8. </strong>
                </span>
                <span>
                  <strong>Correo electrónico (e-mail): </strong>
                  {company.email}
                </span>
              </li>
              <li>
                <span>
                  <strong> 9. </strong>
                </span>
                <span>
                  <strong>Página web: </strong>
                  {company.webSite}
                </span>
              </li>
              <li>
                <span>
                  <strong> 10. </strong>
                </span>
                <span>
                  <strong>R.U.C: </strong> {company.ruc}
                </span>
              </li>
              <li>
                <div>11. </div>
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
                <div>12.</div>
                <div>
                  <span>
                    Cargo de la Autoridad principal de la Empresa o Institución:
                  </span>
                  <span>Gerente General</span>
                </div>
              </li>
              <li>
                <div>13. </div>
                <div>
                  <span>
                    Cargo del Jefe o Supervisor de Práctica Pre-profesional
                    designado por la empresa:
                  </span>
                  <span className="capitalize">{BusinessPositionValue}</span>
                </div>
              </li>
              <li>
                <div>14.</div>
                <div>
                  <span>
                    Nombre y Apellidos del Docente-Supervisor de Práctica
                    designado por el IESTP &quot;GLBR&quot;:
                  </span>
                  <span className="capitalize">{fullName(supervisor)}</span>
                </div>
              </li>
              <li>
                <div>15. </div>
                <div>
                  <span>
                    Rubro y Actividad que realiza la Empresa o Institución:
                    Descripción de los productos o servicios que ofrece.
                  </span>
                  <span className="capitalize">{company.category}</span>
                </div>
              </li>
            </ul>
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

      ul {
        display: flex;
        flex-direction: column;
        gap: 1em;
        list-style: none;
        margin-top: 2em;

        li {
          display: grid;
          grid-template-columns: 2em 1fr;
          div:first-child{
            font-weight: bold;
          }
          div:last-child{
            span:first-child{
              display: flex;
              margin-bottom: .8em;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
  .
`;
