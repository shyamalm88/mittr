import {
  CreatePollAnswerType,
  CreatePollQuestionType,
  CreatePollValueType,
  OptionProp,
} from "../types";

export const defaultPollFormValue: CreatePollValueType = {
  questionSlug: "",
  question: "",
  options: [],
  surveyType: "",
  duration: "",
  topic: [],
  additionalQuestions: [],
  settings: {
    captureGender: false,
    closePollOnScheduledDate: false,
    captureCity: false,
  },
  handleChange: () => {},
  handleDeleteFromList: () => {},
  handleUpdateAnswerType: () => {},
  submit: () => {},
};

export const defaultPollQuestionValue: CreatePollQuestionType = {
  id: "",
  question: "",
  options: [],
  surveyType: "",
  duration: "",
  topic: [],
  additionalQuestions: [],
  settings: {
    captureGender: false,
    closePollOnScheduledDate: false,
    captureCity: false,
  },
};

export const defaultPollAnswerFormValue: CreatePollAnswerType = {
  questionID: "",
  selectedOption: "",
  additionalQuestions: [],
};
