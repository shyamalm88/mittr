const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    id: String,
    questionID: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Polls",
    },
    selectedPrimaryOption: [],
    genderRatio: [],
    country: [],
    monthlyDistribution: [],
    monthlySelectedPoll: [],
    answeredByUserRef: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("PollAnalytics", schema);
