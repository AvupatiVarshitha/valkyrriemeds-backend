const express = require('express');
const router = express.Router();
const Assessment = require('../models/Assessment.model');

// POST /api/save-assessment
router.post('/save-assessment', async (req, res) => {
  const { email, answers, score } = req.body;

    console.log("API hit /save-assessment");
  console.log("Data received:", { email, answers, score });

  if (!email || !answers || typeof score !== 'number') {
    return res.status(400).json({ success: false, message: 'Missing fields' });
  }

  try {
    // Check if user has already submitted
    const existing = await Assessment.findOne({ email });
    if (existing) {
        console.log("Duplicate email, skipping insert");
      return res.json({ success: false, message: 'Assessment already taken' });
    }

    // Save new submission
    const assessment = new Assessment({ email, answers, score });
    await assessment.save();
     console.log("Assessment saved successfully");

    res.json({ success: true });
  } catch (err) {
    console.error('Error saving assessment:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
