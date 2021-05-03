const Note = require('./note.model.js');
const ObjectID = require('mongodb').ObjectID;

function FillOrderData(data) {
    return new Order({        
        client: ObjectID(data.clientId),
        reference: data.reference,
        priority: data.priority,
        summary: data.summary,
        description: data.description,
        scheduledUser: (data.userId) ? ObjectID(data.userId) : null,
        scheduledDate: data.orderDate
    });
};

exports.insert = (body) => {    
    try {                     
        const order = FillOrderData(body);
        order.save();
    } catch (error) {
        throw Error('Error while inserting new note.');
    }
}

exports.get = async function (query) {
    try {
        var notes = await Note.find(query)
        return notes;
    } catch (e) {
        throw Error('Error while getting Notes.')
    }
}

