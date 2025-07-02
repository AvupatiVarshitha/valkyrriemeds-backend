const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { sendVerificationEmail, sendEmail } = require('../utils/mailer');




const JWT_SECRET = process.env.JWT_SECRET;
 // Replace with .env for safety

// ✅ Register Route with Email Verification
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      isVerified: false // ✅ Initially false
    });

    await user.save();

    // ✅ Generate verification token
    const verificationToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });

    // ✅ Send verification email
    const verificationLink = `http://localhost:5000/api/auth/verify/${verificationToken}`;
    await sendVerificationEmail(email, verificationLink);

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please check your email to verify your account.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Error registering user' });
  }
});


// ✅ Email Verification Route
router.get('/verify/:token', async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).send('Invalid verification link');
    }

    user.isVerified = true;
    await user.save();

    res.send('✅ Email verified successfully! You can now login.');
  } catch (err) {
    res.status(400).send('❌ Invalid or expired verification link');
  }
});

// ✅ Login Route with verification check
// ✅ Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found' });
        }

        if (!user.isVerified) {
    return res.status(400).json({ 
        success: false, 
        message: '❌ Please verify your email before logging in.' 
    });
}


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // ✅ Send login notification email
         await sendEmail(
      email,
      'Welcome to Valkyrrie Meds',
      'Thank you for registering!',
      '<h1>Welcome to Valkyrrie Meds</h1><p>Your account has been created successfully.</p>'
    );



        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error logging in' });
    }
});


module.exports = router;
