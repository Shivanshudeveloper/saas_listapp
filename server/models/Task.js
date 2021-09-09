const mongoose = require("mongoose");

const taskchema = new mongoose.Schema({
  contact: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  action: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: false,
  },
  callResult: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: false,
  },
  value: {
    type: Number,
    required: false,
  },
  completed: {
    type: Boolean,
    required: false,
  },
});
const task = mongoose.model("task", taskchema);
module.exports = task;
