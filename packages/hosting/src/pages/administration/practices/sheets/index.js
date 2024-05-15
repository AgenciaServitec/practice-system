import React from "react";
import { PDF } from "./PDF";
import { PracticesSheet1 } from "./PracticesSheet1";
import { Sheet } from "./Sheet";

export const Sheets = () => {
  return (
    <PDF>
      <Sheet layout="portrait">
        <PracticesSheet1 />
      </Sheet>
    </PDF>
  );
};
