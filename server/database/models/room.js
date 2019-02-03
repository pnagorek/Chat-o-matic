const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  owner: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
