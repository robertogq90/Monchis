var mongoose = require('mongoose');
var dbUrl = 'mongodb://localhost:27017/Monchis';

mongoose.connect(dbUrl);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + dbUrl);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected to ' + dbUrl);
});

mongoose.connection.on('error', function (err) {
    console.log('Mongoose error: ' + err);
});


//MODELS SCHEMAS

require('./Profile');
require('./Product');
require('./Ticket');
require('./User');
