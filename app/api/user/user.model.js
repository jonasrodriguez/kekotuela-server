const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userName: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
    }, {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);