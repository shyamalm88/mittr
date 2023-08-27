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
  settings: {
    captureGender: false,
    captureName: false,
    multipleSelection: false,
  },
  advanceSettings: {
    closePollOnScheduledDate: false,
    shareEnabled: false,
    voteAccessToPublic: false,
    visibleToPublic: false,
  },
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
  settings: {
    captureGender: false,
    captureName: false,
    multipleSelection: false,
  },
  advanceSettings: {
    closePollOnScheduledDate: false,
    shareEnabled: false,
    voteAccessToPublic: false,
    visibleToPublic: false,
  },
};
