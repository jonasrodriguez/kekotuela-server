const Service = require('./note.service');
const Note = require('./note.model');

exports.findAll = (req, res) => {
    Note.find(req.body)
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.insert = async function (req, res, next) {
    try {
        const note = await Service.insert(req.body);
        return res.status(200).json({ data: note, message: "Note added succesfully"});
    } catch (e) {
        next(e);
    }
};

exports.update = async function (req, res, next) {
    try {
        const note = await Service.update(req.params.noteId, req.body);
        return res.status(200).json({ data: note, message: "Note updated succesfully"});
    } catch (e) {
        next(e);
    }
}; 

exports.delete = async function (req, res, next) {
    try {
        await Service.delete(req.params.noteId);
        return res.status(200).json({ message: "Note deleted succesfully" });
    } catch (e) {
        next(e);
    }
};