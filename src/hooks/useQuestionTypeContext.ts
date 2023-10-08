import React from "react";
import { QuestionTypeProviderContext } from "../providers/questionType.provider";

export const useQuestionTypeContext = (): any => {
  const { questionType, setQuestionType } = React.useContext(
    QuestionTypeProviderContext
  );
  return { questionType, setQuestionType };
};
