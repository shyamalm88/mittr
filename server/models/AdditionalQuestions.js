const mongoose = require("mongoose");
const Choices = require("./Choices");
const schema = mongoose.Schema({
  question: String,
  answerType: String,
  rangeStartValue: Number,
  rangeEndValue: Number,
  rangeStepValue: Number,
  choices: [{ type: Choices.schema }],
});

module.exports = mongoose.model("AdditionalQuestions", schema);
