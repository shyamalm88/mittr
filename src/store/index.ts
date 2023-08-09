import { CreatePollValueType, OptionProp } from "../types";

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
