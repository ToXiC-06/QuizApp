const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  Question: { type: String },
  Options: { type: Array },
  CorrectOption: { type: Number },
  Points: { type: Number },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
