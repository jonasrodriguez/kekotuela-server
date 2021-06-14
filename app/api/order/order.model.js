const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ClientSchema = require('../client/client.model');

const NoteSchema = mongoose.Schema({    
    reference: String,
    description: String,
}, { _id : false });

const MaterialSchema = mongoose.Schema({    
    name: String,
    reference: String,
    price: Number,
    quantity: Number,
    hours: Number,
    total: Number
}, { _id : false });

const OrderSchema = Schema({
    reference: String,
    note: NoteSchema,
    client: ClientSchema.ClientSchema,
    materials: [MaterialSchema],
    services: [MaterialSchema],
    laborers: [MaterialSchema],
    photoBefore: [String],
    photoAfter: [String],
    comments: String,
    signClient: String,
    signUser: String
    }, {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);