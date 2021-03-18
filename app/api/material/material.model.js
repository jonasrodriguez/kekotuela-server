const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema({    
    name: String,
    type: String,
    price: Number,
    comment: String
    }, {timestamps: true}
);

module.exports = mongoose.model('Material', MaterialSchema);