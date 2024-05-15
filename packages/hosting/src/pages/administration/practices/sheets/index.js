import React from "react";
import { PDF } from "./PDF";
import { PracticesSheet1 } from "./PracticesSheet1";
import { Sheet } from "./Sheet";
import { PracticesSheet2 } from "./PracticesSheet2";

export const Sheets = () => {
  return (
    <PDF>
      <Sheet layout="portrait">
        <PracticesSheet1 />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet2 />
      </Sheet>
    </PDF>
  );
};
