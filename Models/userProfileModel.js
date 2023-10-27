const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  usn: {
    type: String,
    required: [true, 'Please provide a valid usn'],
    lowercase: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Provide a name'],
  },
  totalPoints: {
    type: Number,
    required: [true, 'Provide the points'],
  },
  DSAPoints: {
    type: Number,
    required: [true, 'Provide the points'],
  },
  AptitudePoints: {
    type: Number,
    required: [true, 'Provide the points'],
  },
  DSAEachPoints: [
    {
      contestNumber: {
        type: Number,
        required: [true, 'Provide the contest number'],
      },
      points: {
        type: Number,
        required: [true, 'Provide the points for dsa for the contest'],
      },
    },
  ],
  AptitudeEachPoints: [
    {
      contestNumber: {
        type: Number,
        required: [true, 'Provide the contest number'],
      },
      points: {
        type: Number,
        required: [true, 'Provide the points for aptitude for the contest'],
      },
    },
  ],
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
