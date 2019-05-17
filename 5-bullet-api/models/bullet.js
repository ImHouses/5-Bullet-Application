const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bulletSchema = new Schema({
  _id: new mongoose.Types.ObjectId(),
  creationDate: { type: Date, default: Date.now() },
  content: String,
  bulletType: { type: Schema.Types.ObjectId, ref: "BulletType" },
  bulletDay: { type: Schema.Types.ObjectId, ref: "DayBullet" }
});

module.exports = mongoose.model("Bullet", bulletSchema);