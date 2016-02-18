//var app         = express();
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    morgan      = require('morgan');
    jwt         = require('jsonwebtoken'); // token
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

router.get('/', function(req, res) {
    res.send('Hello! The API is at http://localh/api');
});


module.exports = router;