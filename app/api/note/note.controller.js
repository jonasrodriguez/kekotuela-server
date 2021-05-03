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

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "User data to update can not be empty!"
        });
    }

    const id = req.params.noteId;

    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Note with id=${id}. Maybe Note was not found!`
            });
        } else res.send({ message: "Note was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Note with id=" + id
        });
    });
};

  
exports.delete = (req, res) => {
    const id = req.params.noteId;
  
    User.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Note with id=${id}. Maybe Note was not found!`
          });
        } else {
          res.send({
            message: "Note was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Note with id=" + id
        });
    });
};
