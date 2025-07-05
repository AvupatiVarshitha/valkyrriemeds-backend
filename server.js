const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
console.log("🔍 Using Mongo URI:", process.env.MONGO_URI); // ✅ Check loaded URI

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = [
  "http://localhost:3000",          // Local dev
  "https://valkyrriemeds.com",      // Your main domain
  "https://www.valkyrriemeds.com"   // If www is used
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS Not Allowed"));
    }
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.options("*", cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Routes
const softSkillsRoutes = require('./routes/softskills');
const paymentRoute = require('./routes/payment');
const appointmentRoutes = require('./routes/appointmentRoutes');
const assessmentRoutes = require('./routes/assessment.routes');
const contactRoutes = require('./routes/contactRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const paymentDetailsRoute = require('./routes/paymentSave');
const authRoutes = require('./routes/auth');

app.use('/api/softskills', softSkillsRoutes);
app.use('/api/payment', paymentRoute);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/payment-details', paymentDetailsRoute);
app.use('/api/auth', authRoutes);

// ✅ Test API
app.get('/api/test', (req, res) => {
  res.send('API test route works');
});

// ✅ Root route
app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ Server start
console.log('✅ server.js ready to listen');
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
