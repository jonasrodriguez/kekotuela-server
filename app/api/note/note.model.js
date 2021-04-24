const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema({   
    reference: String,     
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    priority: Boolean,
    summary: String,
    description: String,    
    orderDate: Date,
    }, {timestamps: true}
);

module.exports = mongoose.model('Note', NoteSchema);