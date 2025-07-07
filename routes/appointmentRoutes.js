const express = require('express');
const multer = require('multer');
const Appointment = require('../models/Appointment');
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// POST route
router.post('/register', upload.single('collegeId'), async (req, res) => {
  console.log('✅ POST /register hit'); // Add this
  console.log('Body:', req.body); // Add this
  console.log('File:', req.file); // Add this
   console.log("📥 Received appointment registration form.");

  try {
    const { fullName, mobile, college } = req.body;
const email = req.body.email.trim().toLowerCase(); // ✅ OK


    const collegeId = req.file ? req.file.filename : '';

    const existingUser = await Appointment.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const newAppointment = new Appointment({
      fullName,
      email,
      mobile,
      college,
      collegeId
    });

    await newAppointment.save();
    console.log('✅ Data saved');
    res.status(201).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('❌ Backend Error:', error);
    res.status(500).json({ error: 'Error saving data' });
  }
});

module.exports = router;
