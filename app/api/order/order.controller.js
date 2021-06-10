const Service = require('./order.service');
const Order = require('./order.model');

exports.findAll = (req, res) => {
    Order.find(req.body)
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

exports.insert = async function (req, res, next) {
  try {
      const order = await Service.insert(req.body);
      return res.status(200).json({ data: order, message: "Order added succesfully"});
  } catch (e) {
    next(e);
  }
};

exports.update = async function (req, res, next) {
  try {
      const order = await Service.update(req.params.orderId, req.body);
      return res.status(200).json({ data: order, message: "Order updated succesfully"});
  } catch (e) {
      next(e);
  }
}; 

exports.delete = async function (req, res, next) {
  try {
      await Service.delete(req.params.orderId);
      return res.status(200).json({ message: "Order deleted succesfully" });
  } catch (e) {
      next(e);
  }
};