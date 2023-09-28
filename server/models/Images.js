const mongoose = require("mongoose");
const schema = mongoose.Schema({
  fieldname: String,
  originalname: String,
  encoding: String,
  mimetype: String,
  destination: String,
  filename: String,
  path: String,
  size: Number,
  dimensions: {
    format: String,
    width: Number,
    height: Number,
    space: String,
    channels: Number,
    depth: Number,
    density: Number,
    isProgressive: Boolean,
    hasProfile: Boolean,
    hasAlpha: Boolean,
  },
});

module.exports = mongoose.model("Images", schema);
