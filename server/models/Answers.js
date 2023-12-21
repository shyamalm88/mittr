const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    questionID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Polls",
    },
    selectedOption: String,
    answeredByUserRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    contributorIP: String,
    additionalQuestionsAnswers: [],
    analyticsRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "PollAnalytics",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Answers", schema);
