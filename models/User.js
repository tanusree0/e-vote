
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  aadhaarNumber: { type: String, unique: true },
  age: Number,
  password: String,
  hasVoted: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', userSchema);
