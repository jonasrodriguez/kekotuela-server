const Service = require('./order.service');
const Order = require('./order.model');

exports.insert = async function (req, res) {
    try {
        var orders = Service.insert(req.body);
        return res.status(200).json({ orders, message: "Order added succesfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Retrieve and return all Orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .populate({ 
        path: 'note',
        populate: {
          path: 'client',
          model: 'Client'
        } 
     })
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "User data to update can not be empty!"
        });
    }

    const id = req.params.orderId;

    Note.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update Order with id=${id}. Maybe Order was not found!`
            });
        } else res.send({ message: "Order was updated successfully." });
        })
        .catch(err => {
        res.status(500).send({
            message: "Error updating Order with id=" + id
        });
    });
};

  
exports.delete = (req, res) => {
    const id = req.params.orderId;
  
    User.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Order with id=${id}. Maybe Order was not found!`
          });
        } else {
          res.send({
            message: "Order was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Order with id=" + id
        });
    });
};