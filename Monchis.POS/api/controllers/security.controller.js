var mongoose = require('mongoose');
var User = require('../data/User');
var HttpStatus = require('http-status-codes');
var config = require('../data/config');
var jwt = require('jsonwebtoken');
var Enums = require('../data/Enum');

module.exports.Authenticate = function (req, res) {
    User
        .findOne({ 'userName': req.body.userName })
        .lean()
        .select('_id userName password name lastName profile')
        .populate('profile')
        .exec(function (error, obj) {

            if (error != null) res.json({ success: false, error: error });

            var user = obj;

            if (user == null) {
                res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'User not found.', data: user });
            }
            else {

                if (user.password != req.body.password) {
                    res.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: 'Password invalid.', data: user });
                }
                else {

                    var token = jwt.sign(user, config.secretToken, {
                        expiresIn: '24h'
                    });

                    var startPage = Enums.Pages.Home;
                    if (user.profile == Enums.Profiles.Vendedor) startPage = Enums.Pages.POS;

                    res
                        .status(HttpStatus.OK)
                        .json({
                            success: true,
                            message: 'Login successfull!',
                            token: token,
                            userid: user._id,
                            page: startPage
                        });
                }
            }
        });
};