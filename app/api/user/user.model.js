const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: String,
    name: String,
    surname: String,
    phone: String,
    email: String,
    password: String,
    permissionLevel: Number
    }, {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);