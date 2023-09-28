const mongoose = require("mongoose");
const Images = require("../models/Images");
const schema = mongoose.Schema({
  option: String,
  description: String,
  imageId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Images",
  },
  optionChoiceType: String,
});

module.exports = mongoose.model("Options", schema);
