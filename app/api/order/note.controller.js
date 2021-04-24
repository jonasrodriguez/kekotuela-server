const Service = require('./note.service');
const Note = require('./note.model');

exports.insert = async function (req, res) {
    try {
        var notes = Service.insert(req.body);
        return res.status(200).json({ notes, message: "Note added succesfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Retrieve and return all Orders from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};