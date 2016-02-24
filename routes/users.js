var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'), //mongo connection
    morgan = require('morgan'),
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'),
    md5 = require('sha1'); //used to manipulate POST

var User = require('../model/users');
var Users = mongoose.model('User');
var db = require('../model/db');

// token
var jwt = require('jsonwebtoken');
var app = express();
app.set('superSecret', db.secret); // secret variable


router.route('/authenticate')
    .post(function (req, res) {
    	Users.findOne({ 
    		name: req.body.name
    	}, function (err, user) {

    		var name = user.name,
    		    password = md5(user.password),
    		    admin=user.admin;

    		var user_title = {name, password, email};

    		if (err) throw err;

    		if (!user) {
    			res.json({ success: false, message: 'User not found '});

    		} else if (user) {
    			if (user.password != req.body.password) {
    				res.json({ success: false, message: 'Wrong password' });
    			} else {
    				var token = jwt.sign(user_title, app.get('superSecret'), {
						expiresInMinutes: 1
					});
					console.log(token);
    				res.json({
						success: true,
						message: 'token geldi',
						token: token
					});
    			}
    		}
    	});
    });



// token kontrolü
router.use(function(req, res, next) {
	console.log("router use");
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log(token);
	if (token) {
		jwt.verify(token, app.get('superSecret'), function(err, decoded) {
			if (err) {
				return res.json({ success: false, message: 'Misson Failed by Token'});
			} else {
				req.decoded = decoded;
				next();
			}
		});

	} else {
		return res.status(403).send({
			success: false,
			message: 'No token provided'
		});
	}
});


router.route('/users')
    .get(function (req, res, next) {

    	Users.find({}, function (err, users) {
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
