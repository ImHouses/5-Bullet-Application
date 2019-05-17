const mongoose = require("mongoose");

async function initialize() {
  const err = await mongoose.connect("mongodb://localhost/5bulletapp", { useNewUrlParser: true });
  return err != null;
}

module.exports = { initialize };