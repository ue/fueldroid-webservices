var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    md5 = require('sha1');

var jwt = require('jsonwebtoken');

var db = require('./model/db'),
    blob = require('./model/blobs'),
    vehicle = require('./model/vehicles'),
    user = require('./model/users');


var routes = require('./routes/index'),
    blobs = require('./routes/blobs'),
    vehicles = require('./routes/vehicles'),
    users = require('./routes/users'),
    tokenCtrl = require('./routes/tokenCtrl');



//var users = require('./routes/users');

var app = express();
var apiRoutes = express.Router(); 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('superSecret', db.secret); // secret variable
/*
var token = jwt.sign(user, app.get('superSecret'), {
                        expiresInMinutes: 1440
                    });
console.log(token);


*/
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/*
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

*/

app.use('/',  routes);
app.use('/blobs', tokenCtrl, blobs);
app.use('/vehicles', tokenCtrl, vehicles);
app.use('/api', users);
app.use('/users',tokenCtrl, apiRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});







// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



module.exports = app;
