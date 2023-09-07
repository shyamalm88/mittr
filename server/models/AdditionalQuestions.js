const mongoose = require("mongoose");
const schema = mongoose.Schema({
  question: String,
  answerType: String,
  rangeStartValue: Number,
  rangeEndValue: Number,
  rangeStepValue: Number,
  choices: [],
});

module.exports = mongoose.model("AdditionalQuestions", schema);
