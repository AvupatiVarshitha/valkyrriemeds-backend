const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  mobile: String,
  college: String,
  collegeId: String // stored file name
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
