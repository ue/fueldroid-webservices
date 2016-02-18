var mongoose = require('mongoose');  
var vehicleSchema = new mongoose.Schema({  
  brand_code: Number,
  type_code: Number,
  brand_name: String,
  type_name: String,
  years: {
    2015: { type: Number, default: 55 },
    2014: { type: Number, default: 0 },
    2013: { type: Number, default: 0 },
    2012: { type: Number, default: 0 },
    2011: { type: Number, default: 0 },
    2010: { type: Number, default: 0 },
    2009: { type: Number, default: 0 },
    2008: { type: Number, default: 0 },
    2007: { type: Number, default: 0 },
    2006: { type: Number, default: 0 },
    2005: { type: Number, default: 0 },
    2004: { type: Number, default: 0 },
    2003: { type: Number, default: 0 },
    2002: { type: Number, default: 0 },
    2001: { type: Number, default: 0 }
  }
});
mongoose.model('Vehicle', vehicleSchema);