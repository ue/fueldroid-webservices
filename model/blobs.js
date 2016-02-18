var mongoose = require('mongoose');  
var blobSchema = new mongoose.Schema({  
  ugur: String,
  badge: Number,
  dob: { type: Date, default: Date.now },
  isloved: Boolean
});
mongoose.model('Blob', blobSchema);



// mongo db collection kayıt alanlarının ayaları

