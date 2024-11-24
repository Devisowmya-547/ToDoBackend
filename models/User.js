const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email : {
    required: true,
    type : String,
    unique : true,
    lowercase : true,
    trim : true,
  },
  password : {
    type: String,
    required: true,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;