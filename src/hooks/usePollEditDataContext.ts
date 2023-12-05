import React from "react";
import { PollDataEditContext } from "../providers/pollDataEdit.provider";

export const usePollEditData = (): any => {
  const { pollEditData, setPollEditData } =
    React.useContext(PollDataEditContext);
  return { pollEditData, setPollEditData };
};
