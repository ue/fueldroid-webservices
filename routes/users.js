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
    		username: req.body.username
    	}, function (err, user) {
/*
    		var username = user.username,
    		    admin=user.admin;

    		var user_ = {username, admin};
*/
    		if (err) throw err;

    		if (!user) {
    			console.log("authenticate here user" + user);
    			res.json({ success: false, message: 'User not found '});

    		} else if (user) {
    			if (user.password != req.body.password) {
    				res.json({ success: false, message: 'Wrong password' });
    			} else {
    				var token = jwt.sign(user.username, app.get('superSecret'), {
						expiresInMinutes: 1500
					});
    				res.json({
						success: true,
						message: 'token geldi',
						token: token
					});
    			}
    		}
    	});
    });


router.route('/users/create')
    .post(function(req, res) {
    	Users.findOne({
    		username: req.body.username
    	}, function (err, user) {
    		if (err) throw err;
    		if (!user) {
		    mongoose.model('User').create({
		    	username: req.body['username'],
		    	password: req.body['password'],
		    	admin: req.body['admin']
		    }, function (err, user) {
		    	if (err) throw err; 
		    	else {
		    		console.log('users data' + user);
		    		res.format({
		    			json:function(){
		    				res.json(user);
		    			}
		    		});
		    	}
		    })
    		} else if (user) {
    			res.json({
					success: false,
					message: 'Boyle bir kullanıcı adı mevcut'
				});
    		}
    	});
});

// token controler
router.use(function(req, res, next) {
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
    });

router.route('/users/:id')
	.get(function (req, res) {
		Users.findOne({
			_id: req.params.id
		}, function (err, user) {
			if (!user) {
    			res.format({
    				json:function() {
    					res.json({
    						success: false,
    						message: "User not found"
    					});
    				}
    			});
    		} else {
    			res.format({
    				json:function() {
    					res.json(user);
    				}
    			});
    		}

		});
	});

// DELETE USERS param: /_id
router.delete('/users/:id', function(req, res){
    Users.remove({ _id: req.params.id }, function(err, user){
    	if (err) throw err;
    	res.json({
			success: true,
			message: 'User delete'
		});
    });
});


// UPDATE USERS param : /_id  head : admin
//req token

router.put('/users/:id', function(req, res){
console.log("here");
	Users.update({ _id: req.params.id }, {
		password: req.body.password
	}, function(err, user){
		if (err) throw err;
		res.json({
			success: true,
			message: 'Update işlemi başarılı'
		});
	})
});


/* 56d00380707c516c2927438a */


// setıp get  STR
router.get('/setup', function(req, res) {

    var nick = new user({
        username: 'ugur',
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
