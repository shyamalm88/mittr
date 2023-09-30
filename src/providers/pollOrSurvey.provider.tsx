import React from "react";
import { ComponentInputProps } from "../types";
import { pollOrSurvey } from "../store";

export const PollOrSurveyProviderContext = React.createContext<{
  pollOrSurvey: string;
  setPollOrSurvey: Function;
}>({ pollOrSurvey: "poll", setPollOrSurvey: () => {} });

function PollOrSurveyProvider({ children }: ComponentInputProps) {
  const [pollOrSurvey, setPollOrSurvey] = React.useState("poll");
  return (
    <PollOrSurveyProviderContext.Provider
      value={{ pollOrSurvey, setPollOrSurvey }}
    >
      {children}
    </PollOrSurveyProviderContext.Provider>
  );
}

export default PollOrSurveyProvider;
