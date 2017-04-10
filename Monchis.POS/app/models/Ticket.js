var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductTicketSchema = new Schema({
    quantity: { type: Number, default: 1 },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
});

var TicketSchema = new Schema({
    ticketNumber: { type: String, default: '' },
    date: { type: Date, default: Date.now },
    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    payment: { type: Number, default: 0 },
    change: { type: Number, default: 0 },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    productList: [ProductTicketSchema]
});

function getPrice(num) {
    return (num / 100).toFixed(2);
};

function setPrice(num) {
    return num * 100;
};

var Model = mongoose.model('Ticket', TicketSchema);





module.exports = Model;