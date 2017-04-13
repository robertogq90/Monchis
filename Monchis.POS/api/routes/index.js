var express = require('express');
var routes = express.Router();
var HttpStatus = require('http-status-codes');
var jwt = require('jsonwebtoken');
var Enums = require('../data/Enum');
require('date-utils').language('es');
var s = require('string');
var config = require('../data/config');

var SecurityController = require('../controllers/security.controller.js');
var UserController = require('../controllers/user.controller.js');
var ProductController = require('../controllers/product.controller.js');
var TicketController = require('../controllers/ticket.controller.js');



routes
    .route('/authenticate')
    .post(SecurityController.Authenticate);

routes.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secretToken, function (err, decoded) {
            if (err) {
                return res.statusCode(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.status(403).send({ success: false, message: 'No token provided.' });
    }
});
    
routes
    .route('/user')
    .post(UserController.Create);

routes
    .route('/product')
    .get(ProductController.Get)
    .post(ProductController.Create);

routes
    .route('/product/:id')
    .get(ProductController.GetOne);

routes
    .route('/ticket')
    .post(TicketController.Create);


module.exports = routes;