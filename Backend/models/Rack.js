const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Rack = new Schema({
  indexPlateReference: {
    type: String,
    required: true
  },
  selectedGenus: {
    type: String,
    required: true
  },
  samples: {
    type: String,
    required: true
  }
});
module.exports = Item = mongoose.model("rack", Rack);
