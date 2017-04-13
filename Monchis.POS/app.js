require('./api/data/db.js');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var _ = require("underscore");
var app = express();



app.use(function (req, res, next) {
    console.log(req.method, req.url);
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var routes = require('./api/routes');
app.use('/api', routes);

var server = app.listen(app.get('port'), function () {
    var port = server.address().port;
    console.log('Magic happens on port ' + port);
});

module.exports = app;
