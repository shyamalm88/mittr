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
    options: [],
    surveyType: String,
    votingType: String,
    duration: Date,
    additionalQuestions: [],
    settings: {},
    createdByUserRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Polls", schema);
