const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    questionID: String,
    selectedOption: String,
    answeredByUserRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    contributorIP: String,
    additionalQuestionsAnswers: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PollAnalytics", schema);
