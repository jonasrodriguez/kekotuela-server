const mongoose = require('mongoose');
const ClientSchema = require('../client/client.model');

const NoteSchema = mongoose.Schema({   
    reference: String,     
    client: ClientSchema.ClientSchema,
    priority: Boolean,
    description: String,    
    comments: String,
    scheduledUser: String,
    scheduledDate: Date,
    }, {timestamps: true}
);

module.exports = mongoose.model('Note', NoteSchema);