//var app         = express();
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    morgan      = require('morgan'),
    jwt         = require('jsonwebtoken'), // token
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

var User = require('../model/users');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(methodOverride(function(req, res){
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
      }
}))


router.route('/')
//get all users
    .get(function (req, res, next) {

    	mongoose.model('User').find({}, function (err, users) {
    		if (err) {
    			return console.error(err);
    		} else {
    			res.format({
    				json:function() {
    					res.json(users);
    				}
    			});
    		}
    	});
    })

    .post(function(req, res) {
    	mongoose.model('User').create({
    		name: 'admin',
    		password: 'admin',
    		admin: 'true'
    }, function (err, user) {
    	if (err) {
    		res.send("database de bi sıgındı var");
    	} else {
    		console.log('users data' + user);
    		res.format({
    			json:function(){
    				res.json(user);
    			}

    		});
    	}
    })
});








//not basic route first user register
router.get('/setup', function(req, res) {

    var nick = new user({
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


/*
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
});*/