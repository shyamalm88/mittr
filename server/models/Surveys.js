const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    title: String,
    description: String,
    questionSlug: String,
    survey: [],

    duration: Date,
    settings: {},
    createdByUserRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Surveys", schema);
