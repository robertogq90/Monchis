var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = new Schema({
    userName: { type: String, default: '' },
    password: { type: String, default: '', select: false },
    name: { type: String, default: '' },
    lastName: { type: String, default: '' },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profiles'
    },
    enabled: { type: Boolean, default: true }
});


var Model = mongoose.model('User', UsuarioSchema);

module.exports = Model;