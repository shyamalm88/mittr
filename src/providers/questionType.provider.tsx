import React from "react";
import { ComponentInputProps } from "../types";
import { usePollOrSurveyContext } from "../hooks/usePollOrSurveyContext";

export const QuestionTypeProviderContext = React.createContext<{
  questionType: string | Array<string>;
  setQuestionType: Function;
}>({ questionType: "multiple_choice", setQuestionType: () => {} });

function QuestionTypeProvider({ children }: ComponentInputProps) {
  const { pollOrSurvey, setPollOrSurvey } = usePollOrSurveyContext();
  const [questionType, setQuestionType] = React.useState(
    pollOrSurvey === "poll" ? "multiple_choice" : ["multiple_choice"]
  );

  return (
    <>
      <QuestionTypeProviderContext.Provider
        value={{ questionType, setQuestionType }}
      >
        {children}
      </QuestionTypeProviderContext.Provider>
    </>
  );
}

export default QuestionTypeProvider;
