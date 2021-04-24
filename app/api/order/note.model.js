const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MaterialSchema = mongoose.Schema({    
    name: String,
    reference: String,
    price: Number,
    comment: String
});

const NoteSchema = Schema({
    reference: String,
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    //materials: [MaterialSchema],
    photoBefore: [String],
    photoAfter: [String],
    comments: String,
    signClient: String,
    signUser: String,
    }, {timestamps: true}
);

module.exports = mongoose.model('Note', NoteSchema);