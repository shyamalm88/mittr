export type OptionProp = {
  [key: string]: any;
};
export type QuestionOptionProp = {
  id: string;
  option: string;
  _id: string;
  description?: string;
  imageId: any;
};

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
  questionSlug: string;
  question: string;
  options: OptionProp[] | OptionQProp[];
  duration: string;
  surveyType: string;
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
  reset: Function;
  getState: Function;
};

export type CreatePollSubmittedValueType = {
  question: string;
  votingType: string;
  questionImage: string | undefined;
  questionImageRef: string;
  options: Option[];
  questionSlug: string;
  additionalQuestions: AdditionalQuestion[];
  settings: Settings;
  duration: string;
  createdByUserRef: string;
};

export type AnswerPollSubmittedValueType = {
  selectedPrimaryQuestionOption: string;
  selectedPrimaryQuestionId: string;
  answeredByUserRef: string;
  additionalQuestionsAnswers: [
    {
      questionId: string;
      selectedValue: string | any;
    }
  ];
};

export type AnswerSurveySubmittedValueType = {
  selectedSurveyId: string;
  answeredByUserRef: string;
  survey: [
    {
      segments: [];
    }
  ];
};

export type CreateSurveySubmittedValueType = {
  type: "";
  title: "Untitled Survey";
  description: "";
  survey: [
    {
      question?: string;
      id?: string;
      votingType?: string;
      options?: Option[];
      title?: string;
      description?: string;
      type?: string;
      required?: boolean;
    }
  ];
  questionSlug: string;
  settings: Settings;
  duration: string;
  createdByUserRef: string;
};

export type PollAnalyticsValueType = {
  pollOptions: string;
  dayRange: string;
  additionalAnswersOptions: Array<any>[];
};

export type Option = {
  option: string;
  id?: string;
  label?: string;
  enabled?: boolean;
};

export type AdditionalQuestion = {
  id?: string;
  questionLabel?: string;
  answerType: string;
  question: string;
  dateValidationOption?: string;
  rangeStartValue?: string;
  rangeEndValue?: string;
  rangeStepValue?: string;
  choices?: Choice[];
};

export type Choice = {
  choice: string;
};

export type Settings = {
  captureGender: boolean;
  closePollOnScheduledDate: boolean;
  captureCity: boolean;
  captureCountry: boolean;
};

export type CreatePollQuestionType = {
  _id: string;
  question: string;
  questionImageRef: any;
  contextValueImage?: any;
  options: QuestionOptionProp[] | OptionQProp[];
  surveyType: string;
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
  additionalQuestionsAnswers: [];
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
