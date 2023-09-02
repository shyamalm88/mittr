import React from "react";
import { PollQuestionProviderContext } from "../providers/pollQuestion.provider";
import { CreatePollQuestionType } from "../types";

export const usePollQuestionContext = (
  key?: keyof CreatePollQuestionType
): any => {
  const contextValue = React.useContext(PollQuestionProviderContext);
  if (!contextValue) return;
  return key ? contextValue[key] : contextValue;
};
