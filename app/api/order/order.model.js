const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = mongoose.Schema({    
    name: String,
    reference: String,
    price: Number,
    quantity: Number,
    comment: String
});

const OrderSchema = Schema({
    reference: String,
    note: { type: Schema.Types.ObjectId, ref: 'Note' },
    materials: [MaterialSchema],
    photoBefore: [String],
    photoAfter: [String],
    comments: String,
    signClient: String,
    signUser: String,
    }, {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);