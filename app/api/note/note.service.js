const Note = require('./note.model.js');

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

exports.insert = async (body) => {
    body.reference = await CreateReferenceNum();
    const note = new Note(body);
    note.save();
}

exports.update = async function (id, body) {
    const note = await Note.findById(id);
    if (!note) {
        throw ({ status: 404, code: 'NOTE_NOT_FOUND', message: 'No note found with matching id.' });
    } else {
        note.set(body);
        return note.save();
    }    
}

exports.delete = async function(id) {
    const note = await Note.findById(id);
    if (!note) {
        throw ({ status: 404, code: 'NOTE_NOT_FOUND', message: 'No note found with matching ID.' });
    } else {
        note.remove();
    }
}
