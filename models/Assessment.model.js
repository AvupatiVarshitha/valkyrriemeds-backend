const mongoose = require('mongoose');

// This will create/use spaDB database and assessments collection
const assessmentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true  // Only one submission per email
  },
  answers: {
    type: [Number],  // Array of answer indexes (0–3)
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);


module.exports = Assessment;

