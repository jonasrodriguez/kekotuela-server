const User = require('./user.model');
const Service = require('./user.service');

exports.findAll = (req, res) => {
  User.find().then(users => {
      res.send(users);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving users."
      });
  });
};

exports.login = async function (req, res, next) {
  const { username, password } = req.body;
  try {
    var credentials = await Service.login(username, password);
    return res.status(201).json(credentials);
  } catch (e) {
      next(e);
  }  
};

exports.insert = async function (req, res, next) {
  try {
    const user = await Service.insert(req.body);
      return res.status(201).json({ data: user, message: "User added succesfully"});
  } catch (e) {
      next(e);
  }
};

exports.update = async function (req, res, next) {
  try {
      const user = await Service.update(req.params.userId, req.body);
      return res.status(200).json({ data: user, message: "User updated succesfully"});
  } catch (e) {
      next(e);
  }
};    
  
exports.delete = async (req, res, next) => {
  try {
    await Service.delete(req.params.userId);
    return res.status(200).json({ message: "User deleted succesfully" });
  } catch (e) {
    next(e);
  }
};