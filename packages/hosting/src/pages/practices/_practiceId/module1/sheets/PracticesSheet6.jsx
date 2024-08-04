import React from "react";
import styled from "styled-components";
import { LogoGilda } from "../../../../../images";
import moment from "moment";
import { fullName } from "../../../../../utils";

export const PracticesSheet6 = ({
  practitioner,
  annex4,
  practice,
  company,
  representativeCompany,
}) => {
  const qualityEvaluation = {
    A: {
      code: "A",
      name: "Muy buena",
    },
    B: {
      code: "B",
      name: "Buena",
    },
    C: {
      code: "C",
      name: "Aceptable",
    },
    D: {
      code: "D",
      name: "Deficiente",
    },
  };

  const validationQualityEvaluation = (note = 0) => {
    if (note == 19 || note == 20) {
      return qualityEvaluation["A"];
    }
    if (note >= 15 && note <= 18) {
      return qualityEvaluation["B"];
    }
    if (note == 13 || note == 14) {
      return qualityEvaluation["C"];
    }
    if (note <= 12) {
      return qualityEvaluation["D"];
    }
  };

  const arrayAllNotes = (annex4?.evaluationSheet || []).map((evaluation) =>
    evaluation.indicators.map((indicator) => indicator.assessment)
  );

  const allNotes = arrayAllNotes.flatMap((note) => note);

  const totalNotes = allNotes.reduce(
    (accumulator, note) => accumulator + note,
    0
  );

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
          <div className="body__tip">
            <span>2. </span>
            <span>
              Cada indicador se calificará de 0 a 1, se sumarán las veinte
              (calificaciones) para obtener el puntaje total, luego se
              establecerá las equivalencias con la tabla anterior para expresar
              la evaluación final en forma cualitativa y literal.
            </span>
          </div>
          <div className="body__title">
            <h5>FICHA DE EVALUACIÓN: CRITERIOS Y CALIFICACIÓN</h5>
          </div>
          <Table>
            {(annex4?.evaluationSheet || []).map((_evaluationSheet) => (
              <>
                <tr>
                  <th className="description_a">
                    <div className="item-row">
                      <span> {_evaluationSheet.id}. </span>{" "}
                      <span>{_evaluationSheet.name}</span>
                    </div>
                  </th>
                  <th className="point">CALIF.</th>
                </tr>
                {_evaluationSheet.indicators.map((indicator) => (
                  <tr key={indicator.id}>
                    <td>
                      <div className="item-row">
                        <span>{indicator.id}. </span>
                        <span>{indicator.name}</span>
                      </div>
                    </td>
                    <td>{indicator.assessment}</td>
                  </tr>
                ))}
              </>
            ))}

            <tr>
              <th>
                <div className="item-last-row">
                  <span>PUNTAJE TOTAL:</span>
                </div>
              </th>
              <td>{totalNotes}</td>
            </tr>
          </Table>
          <div className="body__note">
            <span>Nota: </span>
            <span>
              La presente hoja de evaluación será devuelta junto con la
              Constancia de Prácticas Pre-Profesionales que otorgue la empresa
              al practicante.
            </span>
          </div>
          <div className="body__results">
            <strong>
              <div className="evaluation">
                <span>EVALUACIÓN FINAL: {totalNotes}</span>
                <div className="cuality">
                  <span>CUALITATIVA: </span>
                  <span>{validationQualityEvaluation(totalNotes)?.name}</span>
                </div>
                <div className="literally">
                  <span>LITERAL: </span>
                  <span>{validationQualityEvaluation(totalNotes)?.code}</span>
                </div>
              </div>
            </strong>
          </div>
          <div className="body__date">
            <span>
              <strong>Lugar y Fecha: </strong>
            </span>
            <span>
              SAN JUAN DE MIRAFLORES, {moment().format("DD MMMM YYYY")}
            </span>
          </div>
        </div>
        <div className="footer">
          <div className="footer__firma">
            <span>Firma y Sello del Gerente General</span>
            <br />
            <span className="capitalize">
              {fullName(representativeCompany)}
            </span>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  .header {
    text-align: center;
    line-height: 1em;
    display: flex;
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
    padding-bottom: 5em;

    &__tip {
      gap: 1em;
      display: flex;
      width: 570px;
      text-align: justify;
      margin: auto;
      padding-top: 0.5em;
      padding-bottom: 1em;
    }

    &__title {
      text-align: center;
      padding-bottom: 1em;
    }

    &__note {
      font-size: 11px;
      text-align: justify;
      margin: auto;
      width: 570px;
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5em;
      padding-top: 0.5em;
    }

    &__results {
      padding-top: 1em;
      width: 570px;
      margin: auto;

      .evaluation {
        display: flex;
        gap: 1.5em;
      }
    }

    &__date {
      width: 570px;
      padding-top: 0.5em;
      margin: auto;
    }
  }

  .footer {
    width: 500px;
    margin: auto;
    text-align: center;
    border-top: 2px solid #000;

    &__firma {
      margin-top: 0.5em;
    }
  }
`;

const Table = styled.table`
  width: 570px;
  margin: auto;
  border-collapse: collapse;

  tr {
    td,
    th {
      text-align: center;
      font-size: 12px;
      padding: 0.3em;
      border: 1px solid black;

      .item-row {
        text-align: left;
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 0.5em;
      }

      .item-last-row {
        text-align: right;
        margin-right: 0.5em;
      }
    }

    &:last-child {
      text-align: right;
    }
  }
`;
