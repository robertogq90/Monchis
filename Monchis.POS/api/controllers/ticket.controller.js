var mongoose = require('mongoose');
var User = mongoose.model('Ticket');
var HttpStatus = require('http-status-codes');
require('date-utils').language('es');

module.exports.Create = function (req, res) {
    var entity = new Ticket();
    entity = req.body;

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
                res
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .json({ message: "", data: error });
                res.send(error);
            }
            else {
                res
                    .status(HttpStatus.OK)
                    .json({ message: "", data: entity });
            }
        });

    });
};