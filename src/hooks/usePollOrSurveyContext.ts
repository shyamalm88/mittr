import React from "react";
import { PollOrSurveyProviderContext } from "../providers/pollOrSurvey.provider";

export const usePollOrSurveyContext = (): any => {
  const { pollOrSurvey, setPollOrSurvey } = React.useContext(
    PollOrSurveyProviderContext
  );
  return { pollOrSurvey, setPollOrSurvey };
};
