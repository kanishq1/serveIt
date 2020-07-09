const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  token: String,
  name: String,
  email: String,
  phone: Number,
  flat_number: String,
  apartment_name: String,
});

module.exports = mongoose.model('User', userSchema);
