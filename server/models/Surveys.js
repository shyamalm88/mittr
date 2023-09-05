const mongoose = require("mongoose");
const Options = require("./Options");
const AdditionalQuestions = require("./AdditionalQuestions");
const SurveySettings = require("./SurveySettings");

const schema = mongoose.Schema({
  id: String,
  question: String,
  options: [{ type: Options.schema }],
  surveyType: String,
  duration: Date,
  additionalQuestions: [{ type: AdditionalQuestions.schema }],
  settings: { type: SurveySettings.schema },
});

module.exports = mongoose.model("Surveys", schema);
