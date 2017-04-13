var mongoose = require('mongoose');
var Product = mongoose.model('Product');
var HttpStatus = require('http-status-codes');

module.exports.Get = function (req, res) {
    Product.find({}).lean().exec(function (err, result) {
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

        res
            .status(HttpStatus.OK)
            .json(result);
    });
};

module.exports.GetOne = function (req, res) {
    Product.findById(req.params.id).lean().exec(function (err, result) {
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

        res
            .status(HttpStatus.OK)
            .json(result);
    });
};

module.exports.GetEnabled = function (req, res) {
    Product.find({ enabled: true }).lean().exec(function (err, result) {
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

        res
            .status(HttpStatus.OK)
            .json(result);
    });
};

module.exports.Create = function (req, res) {
    var newProduct = new Product();
    newProduct = req.body;
    newProduct.save(function (err, result) {
        if (err) res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);

        res
            .status(HttpStatus.OK)
            .json(result);
    });
};