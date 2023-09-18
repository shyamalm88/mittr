const mongoose = require("mongoose");
const schema = mongoose.Schema({
  selectedValue: mongoose.Mixed,
  questionId: String,
});

module.exports = mongoose.model("AdditionalQuestionsAnswers", schema);
