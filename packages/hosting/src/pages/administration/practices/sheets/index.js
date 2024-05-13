import React from "react";
import { PDF } from "./PDF";
import { PdfRegistrationPractices } from "./PdfRegistrationPractices";
import { Sheet } from "./Sheet";

export const Sheets = () => {
  return (
    <PDF>
      <Sheet layout="portrait">
        <PdfRegistrationPractices />
      </Sheet>
    </PDF>
  );
};
