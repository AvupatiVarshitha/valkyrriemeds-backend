// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  date: { type: Date, required: true },
  trainingRating: { type: String, required: true },
  enjoyment: String,
  keyLearnings: String,
  confusion: String,
  valuableLearning: String,
  trainerRating: { type: String, required: true },
  overallRating: { type: String, required: true },
  additionalComments: String,
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
