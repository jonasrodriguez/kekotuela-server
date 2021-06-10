const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema({    
    name: String,
    reference: String,
    price: Number,
    comment: String
    }, {timestamps: true}
);

module.exports = mongoose.model('Material', MaterialSchema);
