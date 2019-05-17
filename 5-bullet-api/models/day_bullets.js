const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  _id: new mongoose.Types.ObjectId(),
  date: { type: Date, default: Date.now() },
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("DayBullet", schema);