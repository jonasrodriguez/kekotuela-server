const mongoose = require('mongoose');

const ServiceSchema = mongoose.Schema({    
    name: String,    
    price: Number,
    type: String,
    comment: String,
    }, {timestamps: true}
);

module.exports = mongoose.model('Service', ServiceSchema);