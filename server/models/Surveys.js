const mongoose = require("mongoose");
const Options = require("./Options");
const AdditionalQuestions = require("./AdditionalQuestions");
const SurveySettings = require("./SurveySettings");

const schema = mongoose.Schema({
  id: String,
  question: String,
  questionSlug: String,
  options: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Options" }],
  surveyType: String,
  duration: Date,
  additionalQuestions: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "AdditionalQuestions",
    },
  ],
  settings: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "SurveySettings",
  },
});

module.exports = mongoose.model("Surveys", schema);
