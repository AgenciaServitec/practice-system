import React from "react";
import styled from "styled-components";
import { mediaQuery } from "../../../../../../styles";

export const InstructionsEvaluation = () => {
  const indicatorData = [
    {
      key: "1",
      name: "A",
      value: "MUY BUENA",
      range: "19 a 20",
    },
    {
      key: "2",
      name: "B",
      value: "BUENA",
      range: "15 a 18",
    },
    {
      key: "3",
      name: "C",
      value: "ACEPTABLE",
      range: "13 a 14",
    },
    {
      key: "4",
      name: "D",
      value: "DEFICIENTE",
      range: "12 a menos",
    },
  ];

  const columns = [
    {
      title: "ESCALA LITERAL",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ESCALA CUALITATIVA",
      dataIndex: "value",
      key: "value",
    },
    {
      title: "ESCALA CUANTITATIVA",
      dataIndex: "range",
      key: "range",
    },
  ];

  return (
    <Container>
      <div className="instructions">
        <p className="one">
          1. Examine cuidadosamente cada criterio, de los 20 a calificar. Se
          adjunta la siguiente tabla de equivalencia para fines referenciales.
        </p>
        <p className="two">
          2. Cada indicador se califica entre 0 y 1, sumando las veinte
          calificaciones para obtener el puntaje total, luego se establecerá las
          equivalencias con la tabla mostrada para expresar la evaluación final
          en forma cualitativa y literal.
        </p>
      </div>
      <div className="table-item">
        <table>
          <thead>
            <tr>
              {columns.map(({ title }) => (
                <th key={title}>
                  <strong>{title}</strong>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {indicatorData.map(({ key, name, value, range }) => (
              <tr key={key}>
                <td>{name}</td>
                <td>{value}</td>
                <td>{range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 2em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  flex-wrap: wrap;
  gap: 1.2em;
  ${mediaQuery.minDesktop} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  .instructions {
    font-size: 12px;
    text-align: left;
    width: 100%;
  }

  .table-item {
    width: 100%;
    table {
      font-size: 0.7em;
      width: 100%;
      max-width: 30em;
      border-collapse: collapse;
      ${mediaQuery.minDesktop} {
        font-size: 0.8em;
      }
    }

    th,
    td {
      border: 0.5px solid #333;
      padding: 2px 0.8em;
      text-align: left;
      font-weight: initial;
    }

    th {
      background-color: #f4f4f4;
    }
  }
`;
