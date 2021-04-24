const Service = require('./note.service');
const Note = require('./note.model');

// Retrieve and return all Notes from the database.
exports.findAll = (req, res) => {
    Note.find()
    .populate('client')
    .populate('user', 'userName')
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.add = async function (req, res) {
    try {
        var user = Service.insert(req.body);
        return res.status(200).json({ status: 200, data: user, message: "Note added succesfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getNotes = async function (req, res) {
    try {
        var users = await Service.get({})
        return res.status(200).json({ status: 200, data: users, message: "Notes succesfully Retrieved"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

