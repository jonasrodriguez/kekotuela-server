const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({    
    name: String,
    surname: String,
    second_surname: String,
    companyName: String,
    dni: String,
    nif: String,
    phone: String,
    address: String,    
    city: String,
    cp: String,
    email: String,
    comment: String
    }, {timestamps: true}
);

module.exports = mongoose.model('Client', ClientSchema);