const User = require('./user.model');
const Service = require('./user.service');
const jwt = require('jsonwebtoken');

exports.login = async function (req, res) {
  const { username, password } = req.body;

  User.findOne({'userName' : username, 'password': password},function(err, user) {
    if (err) {
      res.status(500).send({message: err.message || "Login error."});
    } else {
      if (user) {
        const accessToken = jwt.sign(user.userName, jwtToken);
        res.send(accessToken);
      }
      else {
        res.status(404).send("User name or password incorrect.");
      }
    }
  });
};

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

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "User data to update can not be empty!"
      });
    }
  
    const id = req.params.userId;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
  
exports.delete = (req, res) => {
    const id = req.params.userId;
  
    User.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };
