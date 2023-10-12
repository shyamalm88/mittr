const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    question: String,
    questionSlug: String,
    questionImageRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Images",
    },
    options: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Options" }],
    surveyType: String,
    votingType: String,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Surveys", schema);
