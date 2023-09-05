const mongoose = require("mongoose");
const schema = mongoose.Schema({
  captureGender: Boolean,
  closePollOnScheduledDate: Boolean,
  captureCity: Boolean,
});

module.exports = mongoose.model("SurveySettings", schema);
