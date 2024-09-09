import React from "react";
import { Col } from "antd";
import styled from "styled-components";

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
      <Col span={24} md={12}>
        <div className="instructions">
          <span className="one">
            1. Examine cuidadosamente cada criterio, de los 20 a calificar. Se
            adjunta la siguiente tabla de equivalencia para fines referenciales.
          </span>
          <span className="two">
            2. Cada indicador se califica entre 0 y 1, sumando las veinte
            calificaciones para obtener el puntaje total, luego se establecerá
            las equivalencias con la tabla mostrada para expresar la evaluación
            final en forma cualitativa y literal.
          </span>
        </div>
      </Col>
      <Col span={24} md={12}>
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
      </Col>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 2em;

  .instructions {
    place-items: center;
    display: grid;
    gap: 2em;
    font-size: 12px;

    .one,
    .two {
      width: 80%;
    }
  }

  table {
    font-size: 12px;
    width: 75%;
    border-collapse: collapse;
  }

  th,
  td {
    border: 0.5px solid #333;
    padding: 2px;
    text-align: left;
    font-weight: initial;
  }

  th {
    background-color: #f4f4f4;
  }
`;
