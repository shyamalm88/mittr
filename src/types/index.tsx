export type OptionProp = {
  [key: string]: any;
};
export type QuestionOptionProp = { id: string; option: string };

export type OptionQProp = { id: string; questionLabel: string; value: string };

export type OptionsProps = OptionProp[] | OptionQProp[];
export type ChildrenProps = {
  children: React.ReactNode;
};

export type NavigationPageProps = {
  pages: {
    id: string;
    icon: React.JSX.Element;
    label: string;
  }[];
};

export type ComponentInputProps = {
  [key: string]: any;
};

export type CreatePollValueType = {
  question: string;
  options: OptionProp[] | OptionQProp[];
  pollType: string;
  duration: string;
  topic: CreatePollAdditionalQuestionTopicType[];
  additionalQuestions: CreatePollAdditionalQuestionType[];
  settings: {
    captureGender: boolean;
    closePollOnScheduledDate: boolean;
    captureCity: boolean;
  };
  handleChange: Function;
  handleDeleteFromList: Function;
  handleUpdateAnswerType: Function;
  submit: Function;
};

export type CreatePollQuestionType = {
  question: string;
  options: QuestionOptionProp[] | OptionQProp[];
  pollType: string;
  duration: string;
  topic: CreatePollAdditionalQuestionTopicType[];
  additionalQuestions: CreatePollAdditionalQuestionType[];
  settings: {
    captureGender: boolean;
    closePollOnScheduledDate: boolean;
    captureCity: boolean;
  };
};
export type CreatePollAnswerType = {
  questionID: string;
  selectedOption: string;
  additionalQuestions: [];
};
export type CreatePollAdditionalQuestionType = {
  question: string;
  answerType: string;
  date: string;
  startDate: string;
  endDate: string;
  startValue: number;
  endValue: number;
  choices: [];
  country: string;
  state: string;
  city: string;
};

export type CreatePollAdditionalQuestionTopicType = {
  id: string;
  label: string;
};

export interface TagOptionsType {
  label: string;
  id: number | string;
}
