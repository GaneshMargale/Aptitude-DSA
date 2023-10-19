const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  contestNumber: {
    type: Number,
    required: [true, 'Provide a contest number'],
  },
  contestType: {
    type: String,
    required: [true, 'Provide a contest type'],
    lowercase: true,
    enum: {
      values: ['aptitude', 'dsa'],
      message: 'The type shoulde be aptitude or dsa',
    },
  },
  questionNumber: {
    type: Number,
    required: [true, 'Provide Question Number'],
  },
  answerOption: {
    type: String,
    required: [true, 'Provide Answer Option'],
  },
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer;
