var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = new Schema({
    name: { type: String, default: '' },
    enabled: { type: Boolean, default: true }
});


var Model = mongoose.model('Profile', ProfileSchema, 'profiles');

module.exports = Model;