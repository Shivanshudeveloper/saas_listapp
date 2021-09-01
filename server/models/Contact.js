const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: false,
  },
  lName: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  emailType: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  extn: {
    type: String,
    required: false,
  },
  phoneType: {
    type: String,
    required: false,
  },
  stage: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  country: {
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
  owner: {
    type: String,
    required: false,
  },
  tags: {
    type: String,
    required: false,
  },
});
const contact = mongoose.model("contact", contactSchema);
module.exports = contact;
