const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    questionID: String,
    selectedOption: String,
    loggedInUserDetails: {},
    contributorIP: String,
    additionalQuestionsAnswers: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "AdditionalQuestionsAnswers",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answers", schema);
