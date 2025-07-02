const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// ✅ Routes
const softSkillsRoutes = require('./routes/softskills');
const paymentRoute = require('./routes/payment');
const appointmentRoutes = require('./routes/appointmentRoutes');
const assessmentRoutes = require('./routes/assessment.routes');
const contactRoutes = require('./routes/contactRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const paymentDetailsRoute = require('./routes/paymentSave');
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Test API
app.get('/api/test', (req, res) => {
  res.send('API test route works');
});

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes with proper prefixes
app.use('/api/softskills', softSkillsRoutes);
app.use('/api/payment', paymentRoute);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payment-details', paymentDetailsRoute);
app.use('/api/auth', authRoutes);

// ✅ Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/spaDB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

console.log('✅ server.js ready to listen');

// ✅ Server start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
