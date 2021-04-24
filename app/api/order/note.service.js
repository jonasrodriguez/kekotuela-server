const Note = require('./note.model');
const ObjectID = require('mongodb').ObjectID;

function FillNoteData(data) {
    return new Note({    
        redeableId: data.redeableId,
        order: ObjectID(data.orderId),
        materials: data.materials,
        photoBefore: data.photoBeforePath,
        photoAfter: data.photoAfterPath,
        comments: data.comments,
        signClient: data.signClientPath,
        signUser: data.signUserPath
    });
};

exports.insert = (body) => {    
    try {                     
        const note = new Note(body);
        note.save();
    } catch (error) {
        throw Error('Error while inserting new Note');
    }
}

exports.get = async function (query) {
    try {
        return await Note.find(query);
    } catch (e) {
        throw Error('Error while getting Notes');
    }
}

exports.findAll = async function () {
    try {
        return await Note.find();
    } catch (e) {
        throw Error('Error while getting Notes');
    }
}
