import {
  CreatePollQuestionType,
  CreatePollValueType,
  OptionProp,
} from "../types";

export const defaultPollFormValue: CreatePollValueType = {
  question: "",
  options: [],
  pollType: "",
  duration: "",
  topic: [],
  additionalQuestions: [],
  handleChange: () => {},
  handleDeleteFromList: () => {},
  handleUpdateAnswerType: () => {},
  submit: () => {},
};

export const defaultPollQuestionValue: CreatePollQuestionType = {
  question: "",
  options: [],
  pollType: "",
  duration: "",
  topic: [],
  additionalQuestions: [],
};
