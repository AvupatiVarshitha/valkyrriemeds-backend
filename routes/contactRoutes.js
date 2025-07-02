const express = require('express');
const router = express.Router();
const ContactSubmission = require('../models/ContactSubmission');

router.post('/submit-contact', async (req, res) => {
  try {
    const { fullName, email, mobileNumber, subject, message } = req.body;

    if (!fullName || !email || !subject || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newSubmission = new ContactSubmission({
      fullName,
      email,
      mobileNumber,
      subject,
      message
    });

    await newSubmission.save();
    res.status(200).json({ message: 'Contact submission saved successfully' });

  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    console.error('Error saving contact submission:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
