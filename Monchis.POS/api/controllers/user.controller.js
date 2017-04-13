var mongoose = require('mongoose');
var User = mongoose.model('User');
var HttpStatus = require('http-status-codes');

module.exports.Create = function (req, res) {
    var User = new Product();
    User = req.body;
    User.save(function (err, result) {
        if (error) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);

        res
            .status(HttpStatus.OK)
            .json(result);
    });
};