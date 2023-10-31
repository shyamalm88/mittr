const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    questionSlug: String,
    survey: [{ type: mongoose.SchemaTypes.ObjectId, ref: "SurveySection" }],

    duration: Date,
    settings: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "SurveySettings",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Surveys", schema);
