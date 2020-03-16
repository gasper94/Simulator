const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sample = new Schema({
  id: {
    type: String,
    required: true
  }
});
module.exports = Item = mongoose.model("sample", Sample);
