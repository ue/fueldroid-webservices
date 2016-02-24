var express = require('express'),
    bodyParser = require('body-parser'),
    md5 = require('sha1');

var jwt = require('jsonwebtoken');
var app = express();
var apiRoutes = express.Router(); 


app.use(function(req, res, next) {
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

module.exports = app;