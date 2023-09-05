const mongoose = require("mongoose");
const schema = mongoose.Schema({
  id: { type: Number, unique: true, min: 1 },
  choice: String,
});

module.exports = mongoose.model("Choices", schema);
