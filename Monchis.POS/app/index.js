var User = require('./models/User');
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

    

    routes.get('*', function (req, res) {
        res.sendfile('./public/index.html');
    });

};