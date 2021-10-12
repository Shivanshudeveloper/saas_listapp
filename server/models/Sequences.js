const mongoose = require("mongoose");

const sequencechema = new mongoose.Schema({
  steps: {
    type: Array,
    required: false,
  },
});
const sequence = mongoose.model("sequence", sequencechema);
module.exports = sequence;
