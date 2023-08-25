import React from "react";
import { ChildrenProps, CreatePollQuestionType } from "../types";
import { defaultPollQuestionValue } from "../store";

export const AnalyticsOfPollContext = React.createContext(
  defaultPollQuestionValue
);

function AnalyticsOfPollProvider({
  question,
  children,
}: {
  question: CreatePollQuestionType | any;
  children: React.ReactNode;
}) {
  return (
    <AnalyticsOfPollContext.Provider value={question}>
      {children}
    </AnalyticsOfPollContext.Provider>
  );
}

export default AnalyticsOfPollProvider;
