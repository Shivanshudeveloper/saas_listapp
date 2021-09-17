const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  subject: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  tag: {
    type: Array,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const template = mongoose.model("template", templateSchema);
module.exports = template;
