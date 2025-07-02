// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/submit-feedback', async (req, res) => {
  try {
    // Normalize input
    const firstName = req.body.firstName.trim().toLowerCase();
    const lastName = req.body.lastName.trim().toLowerCase();

    // Check duplicate
    const existingFeedback = await Feedback.findOne({ firstName, lastName });
    if (existingFeedback) {
      return res.status(400).json({ message: 'Feedback already submitted for this name.' });
    }

    // Save new feedback with normalized names
    const feedback = new Feedback({
      ...req.body,
      firstName,
      lastName,
    });
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback.' });
  }
});

module.exports = router;
