const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    profileImgUrl: String,
    googleId: String,
    bio: String,
    settings: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
