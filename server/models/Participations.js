const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    questionID: String,
    selectedOption: String,
    answeredByUserRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    contributorIP: String,
    survey: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Participations", schema);
