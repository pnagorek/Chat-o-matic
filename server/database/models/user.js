const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
