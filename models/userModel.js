const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
