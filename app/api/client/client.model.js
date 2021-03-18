const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({    
    name: String,
    surname: String,
    second_surname: String,
    dni: String,
    phone: String,
    address: String,
    email: String,
    comment: String
    }, {timestamps: true}
);

module.exports = mongoose.model('Client', ClientSchema);