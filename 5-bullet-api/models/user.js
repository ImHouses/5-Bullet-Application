const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  email: String,
  name: String,
  lastName: String,
  profilePicUrl: String,
  lastSignIn: { type: Date, default: Date.now() },
  password: String
});

module.exports = mongoose.model("User", schema);