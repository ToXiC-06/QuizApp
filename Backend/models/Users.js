const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Mobile: {
    type: String,
  },
  Score: {
    type: Number,
  },
  HasAttended: {
    type: Boolean,
  },
});
const User = mongoose.model("User", usersSchema);

module.exports = User;
