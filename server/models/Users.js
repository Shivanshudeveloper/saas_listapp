const mongoose = require("mongoose");

const usersDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  userId: { type: String, required: false },
  host: { type: String, required: false },
  port: { type: String, required: false },
  tls: { type: String, required: false },
  username: { type: String, required: false },
  password: { type: String, required: false },
  emails: { type: Array, required: false },
});
const users = mongoose.model("users", usersDataSchema);
module.exports = users;
