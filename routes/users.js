//var app         = express();
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    morgan      = require('morgan');
    jwt         = require('jsonwebtoken'); // token
    bodyParser = require('body-parser'); //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//basic route
router.get('/', function (req, res) {
    res.send('MERHABA ! fueldroid user api bölümündesiniz');

});

//not basic route first user register
router.get('/setup', function(req, res) {

	var nick = new User({
	    name: 'ugur',
		password: 'erdal',
		admin: 'true'
	});
	nick.save(function (err) {
		if (err) throw err;

		console.log('User saved succesfully');
		res.json({ succes:true });
	});
});



module.exports = router;