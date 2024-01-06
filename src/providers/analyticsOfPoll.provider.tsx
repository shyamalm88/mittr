import React from "react";
import { CreatePollQuestionType } from "../types";
import { defaultPollQuestionValue } from "../store";
import * as _ from "underscore";

export const AnalyticsOfPollContext = React.createContext(
  defaultPollQuestionValue
);

function AnalyticsOfPollProvider({
  question,
  answers,
  children,
}: {
  answers: CreatePollQuestionType | any;
  question: CreatePollQuestionType | any;
  children: React.ReactNode;
}) {
  console.log(answers);
  const allAnswers = answers.map((x: any) => x.additionalQuestionsAnswers);
  const mappedSelectedAnswers = new Map();
  allAnswers.forEach((element: any) => {
    element.forEach((elem: any) => {
      const value: any = Object.keys(elem.selectedValue).map(
        (k) => elem.selectedValue[k]
      );
      if (mappedSelectedAnswers.get(elem.questionId)) {
        if (typeof value[0] === "object") {
          mappedSelectedAnswers.set(elem.questionId, [
            ...mappedSelectedAnswers.get(elem.questionId),
            value[0].city ? value[0].city.name : value[0].name,
          ]);
        } else {
          mappedSelectedAnswers.set(elem.questionId, [
            ...mappedSelectedAnswers.get(elem.questionId),
            value[0],
          ]);
        }
      } else {
        if (typeof value[0] === "object") {
          mappedSelectedAnswers.set(elem.questionId, [
            value[0].city ? value[0].city.name : value[0].name,
          ]);
        } else {
          mappedSelectedAnswers.set(elem.questionId, [value[0]]);
        }
      }
    });
  });
  const arr = Array.from(mappedSelectedAnswers, ([id, value]) => ({
    id,
    value,
  }));
  function onlyUnique(value: any, index: number, array: any) {
    return array.indexOf(value) === index;
  }
  const uniqueAnswers = arr.map((itm) => {
    return { id: itm.id, value: itm.value.filter(onlyUnique) };
  });

  uniqueAnswers.forEach((item: any) => {
    answers[0].questionID.additionalQuestions.forEach((itm: any) => {
      if (item.id === itm.id) {
        item.question = itm.question;
      }
    });
  });
  question.additionalAnswers = uniqueAnswers;

  return (
    <AnalyticsOfPollContext.Provider value={question}>
      {children}
    </AnalyticsOfPollContext.Provider>
  );
}

export default AnalyticsOfPollProvider;
