const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  contestNumber: {
    type: Number,
    required: [true, 'Provide a contest number'],
    unique: true,
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
  Results: [
    {
      rank: {
        type: Number,
        required: [true, 'Provide the rank'],
      },
      usn: {
        type: String,
        required: [true, 'Please provide a valid usn'],
        lowercase: true,
      },
      name: {
        type: String,
        required: [true, 'Provide a name'],
      },
      points: {
        type: Number,
        required: [true, 'Provide the points'],
      },
    },
  ],
});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
