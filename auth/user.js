const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  shaders: {
    type: Array,
    default: [{name: String, red: String, green: String, blue: String, sin: String, tan: String, absoulte: String, frequency: String}]
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
