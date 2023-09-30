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
  reset: () => {},
  getState: () => {},
};

export const defaultPollQuestionValue: CreatePollQuestionType = {
  id: "",
  question: "",
  questionImageRef: "",
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
  additionalQuestionsAnswers: [],
};

export const pollOrSurvey: any = {
  pollOrSurvey: "",
};
