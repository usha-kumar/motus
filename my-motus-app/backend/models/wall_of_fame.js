// User.js
const mongoose = require('mongoose');

const WallOfFameSchema= new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  login: { type: String, required: true, unique: true },
  scores: { type: Number, default: 0 }
});

module.exports = mongoose.model('WallOfFame', WallOfFameSchema);
