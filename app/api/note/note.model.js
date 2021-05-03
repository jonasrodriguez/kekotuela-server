const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema({   
    reference: String,     
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    priority: Boolean,
    description: String,    
    comments: String,
    scheduledUser: { type: Schema.Types.ObjectId, ref: 'User' },
    scheduledDate: Date,
    }, {timestamps: true}
);

module.exports = mongoose.model('Note', NoteSchema);