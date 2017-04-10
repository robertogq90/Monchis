var User = require('./models/User');
var Product = require('./models/Product');
var Ticket = require('./models/Ticket');


require('date-utils').language('es');
var s = require('string');
var jwt = require('jsonwebtoken');
var Enums = require('./models/Enum');
var _ = require('underscore');

module.exports = function (routes, config) {

    routes.post('/authenticate', function (req, res) {

        User.findOne({ 'userName': req.body.userName }).select('password').populate('profiles').exec(function (error, obj) {

            if (error != null) res.json({ success: false, error: error });

            var user = obj;

            if (user == null) {
                res.json({ success: false, message: 'User not found.', data: user });
            }
            else {

                if (user.Password != req.body.Password) {
                    res.json({ success: false, message: 'Password invalid.', data: user });
                }
                else {

                    var token = jwt.sign(user, config.secretToken, {
                        expiresIn: '24h'
                    });

                    var startPage = "/home";
                    if (user.profile == Enums.Profiles.Vendedor) startPage = "/POS";

                    res.json({
                        success: true,
                        message: 'Login successfull!',
                        token: token,
                        userid: user._id,
                        page: startPage
                    });
                }
            }
        });

    });

    routes.use(function (req, res, next) {
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, config.secretToken, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
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
    
    routes.post('/user', function (req, res) {
        var entity = new User();
        entity.userName = req.body.userName;
        entity.password = req.body.password;
        entity.name = req.body.name;
        entity.lastName = req.body.lastName;
        entity.profile = req.body.profile;
        entity.enabled = req.enabled;

        entity.save(function (error) {
            if (error) {
                res.json({ message: "", data: error });
                res.send(error);
            }
            else {
                res.json({ message: "", data: entity });
            }
        });

    });

    routes.post('/product', function (req, res) {
        var entity = new Product();
        entity.name = req.body.name;
        entity.subtotal = req.body.subtotal;
        entity.tax = req.body.tax;
        entity.total = req.body.total;
        entity.enabled = req.body.enabled;

        entity.save(function (error) {
            if (error) {
                res.json({ message: "", data: error });
                res.send(error);
            }
            else {
                res.json({ message: "", data: entity });
            }
        });
    });

    routes.get('/product', function (req, res) {
        Product.find({}).exec(function (error, data) {
            if (error) res.send(error);

            res.json(data);
        });
    });

    routes.get('/product/:id', function (req, res) {
        Product.find({ _id: req.params.id }).exec(function (error, data) {
            if (error) res.send(error);

            res.json(data);
        });
    });

    routes.get('/product/enabled', function (req, res) {
        Product.find({ enabled: true }).exec(function (error, data) {
            if (error) res.send(error);

            res.json(data);
        });
    });

    routes.post('/ticket', function (req, res) {
        var entity = new Ticket();
        entity.ticketNumber = req.body.ticketNumber;
        entity.date = Date.now();
        entity.subtotal = req.body.subtotal;
        entity.tax = req.body.tax;
        entity.total = req.body.total;
        entity.payment = req.body.payment;
        entity.change = req.body.change;
        entity.user = req.body.user;
        entity.productList = req.body.productList;
        
        entity.find({ 'date': { '$gte': Date.today(), '$lt': Date.tomorrow() } }).exec(function (error, data) {
            if (error) res.send(error);

            var cantidad = data.length;
            cantidad++;
            var folio = cantidad.toString()
            folio = S(folio).padLeft(5).s;
            folio = S(folio).replaceAll(' ', '0').s;
            entity.ticketNumber = entity.ticketNumber + folio;

            entity.save(function (error) {
                if (error) {
                    res.json({ message: "", data: error });
                    res.send(error);
                }
                else {
                    res.json({ message: "", data: entity });
                }
            });

        });
    });


    routes.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};