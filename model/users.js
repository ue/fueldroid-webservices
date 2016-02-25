var mongoose = require('mongoose');  
var userSchema = new mongoose.Schema({  
    username: String,
    password: String,
    admin: Boolean

});
mongoose.model('User', userSchema);

/*
  email: { type: String, unique: true, lowercase: true },
  password: String,
  name: String,
  gender: {type: String, default: ''},
  picture: { type: String, default: '' },
  facebook: String,
  google: String,
  tokens: Array,
  createDate: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date
  */