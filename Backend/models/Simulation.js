const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Simulation = new Schema({
  id: {
    type: String,
    required: true
  },
  environment: {
    type: String,
    required: true
  },
  userPersona: {
    type: String,
    required: true
  },
  racks: {
    type: String,
    required: true
  },
  sample: {
    type: String,
    required: true
  },
  analysisFiles: {
    type: String,
    required: true
  }
});
module.exports = Item = mongoose.model("simulation", Simulation);
