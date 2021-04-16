const Service = require('./order.service');
const Order = require('./order.model');

// Retrieve and return all Orders from the database.
exports.findAll = (req, res) => {
    Order.find()
    .populate('client')
    .populate('user', 'userName')
    .then(orders => {
        res.send(orders);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    });
};

exports.addOrder = async function (req, res) {
    try {
        var user = Service.insert(req.body);
        return res.status(200).json({ status: 200, data: user, message: "Order added succesfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

exports.getOrders = async function (req, res) {
    try {
        var users = await Service.get({})
        return res.status(200).json({ status: 200, data: users, message: "Orders succesfully Retrieved"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

