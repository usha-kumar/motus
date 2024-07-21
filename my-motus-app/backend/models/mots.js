// User.js
const mongoose = require('mongoose');

const MotsSchema= new mongoose.Schema({
  word: { type: String, required: true },
  attempts: [String],
  completed: { type: Boolean, default: false },
  won: { type: Boolean, default: false },
  longeur: { type: Number },
  difficulte: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' }
});

module.exports = mongoose.model('Mots', MotsSchema);
