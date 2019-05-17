const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bulletTypeSchema = new Schema({
    _id: new mongoose.Types.ObjectId(),
    name: String,
    iconUrl: String
});

module.exports = mongoose.model("BulletType", bulletTypeSchema);