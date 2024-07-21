// User.js
const mongoose = require('mongoose');

const UsersSchema= new mongoose.Schema({
  pseudo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  numero_secu: { type: Number, default: 0 }
});

module.exports = mongoose.model('Users', UsersSchema);
