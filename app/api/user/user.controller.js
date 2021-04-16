const User = require('./user.model');
const Service = require('./user.service');

exports.insert = async function (req, res) {
    try {
        var user = Service.insert(req.body);
        return res.status(200).json({ status: 200, data: user, message: "User added succesfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Retrieve and return all Users from the database.
exports.findAll = (req, res) => {
    User.find().then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

exports.getUsers = async function (req, res) {
    try {
        var users = await Service.getUsers({})
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}
