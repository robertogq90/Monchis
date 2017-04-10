var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = new Schema({
    name: { type: String, default: '' },
    subtotal: { type: Number },
    tax: { type: Number },
    total: { type: Number },
    enabled: { type: Boolean, default: true }
});

var Model = mongoose.model('Product', ProductSchema);

module.exports = Model;