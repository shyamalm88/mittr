import uniqid from "uniqid";

export const surveyQuestion = {
  survey: [
    {
      question: "",
      questionImage: "",
      questionImageRef: null,
      questionSlug: "",
      votingType: "multiple_choice",
      options: [
        { id: uniqid(), label: "Option", enabled: true, option: "" },
        { id: uniqid(), label: "Option", enabled: true, option: "" },
      ],
    },
  ],
  additionalQuestions: [
    {
      id: uniqid(),
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
