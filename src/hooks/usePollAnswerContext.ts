import React from "react";
import { PollAnswerProviderContext } from "../providers/pollAnswer.provider";
import { CreatePollAnswerType } from "../types";

export const usePollAnswerContext = (key?: keyof CreatePollAnswerType): any => {
  const contextValue = React.useContext(PollAnswerProviderContext);
  return contextValue;
};
