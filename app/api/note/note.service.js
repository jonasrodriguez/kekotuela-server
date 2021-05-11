const Note = require('./note.model.js');
const ObjectID = require('mongodb').ObjectID;

const CreateReferenceNum = async () => {
    const today = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), 0, 0, 0);
    const tomorrow = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + 1, 0, 0, 0);

    var refCount = await Note.countDocuments( 
        { createdAt: {
            $gte: today,
            $lte: tomorrow
        }}
    ); 

    return "N_" + today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + today.getDate()).slice(-2) + "_" + refCount;
}

function FillNoteData(data) {
    return new Note({        
        client: ObjectID(data.clientId),
        reference: data.reference,
        priority: data.priority,
        summary: data.summary,
        description: data.description,
        scheduledUser: (data.userId) ? ObjectID(data.userId) : null,
        scheduledDate: data.orderDate
    });
};

exports.insert = async (body) => {
    try {
        body.reference = await CreateReferenceNum();
        const note = FillNoteData(body);
        note.save();
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

