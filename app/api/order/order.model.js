const mongoose = require('mongoose');

const MaterialSchema = mongoose.Schema({    
    materialId: String,
    priceUnit: Number,
    quantity: Number
});

const OrderSchema = mongoose.Schema({    
    userId: String,
    clientId: String,
    comments: String,
    descripcion: String,
    materials: MaterialSchema,
    }, {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);