const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  code: {
    type: String,
    required: false,
  },
  linkedin: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  industry: {
    type: String,
    required: false,
  },
  about: {
    type: String,
    required: false,
  },
  numOfEmps: {
    type: String,
    required: false,
  },
  filePath: {
    type: String,
    required: false,
  },
});
const company = mongoose.model("company", companySchema);
module.exports = company;
