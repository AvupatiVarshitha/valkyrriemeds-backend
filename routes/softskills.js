const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true,required: true },

  mobile: String,
  college: String,
  ageGroup: String,
  workshops: [String],
  mode: String,
  updates: String,
  timestamp: { type: Date, default: Date.now }
}, {
  collection: 'softskills_enrollments'  // specify exact collection name here
});

const SoftSkillsEnrollment = mongoose.model('SoftSkillsEnrollment', enrollmentSchema);

router.post('/enroll-softskills', async (req, res) => {
  try {
    const enrollment = new SoftSkillsEnrollment(req.body);
    await enrollment.save();
    res.status(200).json({ message: 'Enrollment successful!' });
  } catch (error) {
    console.error('Error saving form:', error);

    // Check for duplicate email more robustly
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

module.exports = router;
