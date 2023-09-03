import React from "react";
import { ChildrenProps, CreatePollQuestionType } from "../types";
import { defaultPollQuestionValue } from "../store";

export const PollQuestionProviderContext = React.createContext({
  ...defaultPollQuestionValue,
  loading: false,
});

function PollQuestionProvider({
  question,
  children,
}: {
  question: CreatePollQuestionType | any;
  children: React.ReactNode;
}) {
  return (
    <PollQuestionProviderContext.Provider value={question}>
      {children}
    </PollQuestionProviderContext.Provider>
  );
}

export default PollQuestionProvider;
