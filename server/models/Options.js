const mongoose = require("mongoose");
const schema = mongoose.Schema({
  option: String,
});

module.exports = mongoose.model("Options", schema);
