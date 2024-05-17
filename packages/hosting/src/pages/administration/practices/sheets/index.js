import React from "react";
import { PDF } from "./PDF";
import { PracticesSheet1 } from "./PracticesSheet1";
import { Sheet } from "./Sheet";
import { PracticesSheet2 } from "./PracticesSheet2";
import { PracticesSheet3 } from "./PracticesSheet3";
import { PracticesSheet4 } from "./PracticesSheet4";
import { PracticesSheet5 } from "./PracticesSheet5";

export const Sheets = () => {
  return (
    <PDF>
      <Sheet layout="portrait">
        <PracticesSheet1 />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet2 />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet3 />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet4 />
      </Sheet>
      <Sheet layout="portrait">
        <PracticesSheet5 />
      </Sheet>
    </PDF>
  );
};
