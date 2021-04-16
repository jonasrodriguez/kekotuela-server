const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = Schema({   
    readableId: String,     
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    priority: Number,
    description: String,    
    orderDate: Date,
    }, {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);