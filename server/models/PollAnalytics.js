const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    questionID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Polls",
    },
    selectedPrimaryOption: [],
    additionalQuestionsAnswers: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PollAnalytics", schema);
