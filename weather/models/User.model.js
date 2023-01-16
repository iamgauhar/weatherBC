const mongoose = require("mongoose");

const UserModel = mongoose.model(
  "user",
  mongoose.Schema({
    name: String,
    email: String,
    password: String,
  })
);

module.exports = { UserModel };
