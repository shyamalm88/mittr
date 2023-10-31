const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    question: String,
    title: String,
    description: String,
    votingType: String,
    type: String,
    options: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("SurveySection", schema);
