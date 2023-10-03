import { v4 as uuidv4 } from "uuid";

export const surveyQuestion = {
  survey: [
    {
      question: "",
      questionImage: "",
      questionImageRef: null,
      questionSlug: "",
      votingType: "multiple_choice",
      options: [
        { id: uuidv4(), label: "Option", enabled: true, option: "" },
        { id: uuidv4(), label: "Option", enabled: true, option: "" },
      ],
    },
  ],
  additionalQuestions: [
    {
      id: uuidv4(),
      questionLabel: "Question",
      answerType: "",
      question: "",
    },
  ],
  settings: {
    captureGender: false,
    closePollOnScheduledDate: false,
    captureCity: false,
    captureCountry: false,
  },
  duration: "",
};
