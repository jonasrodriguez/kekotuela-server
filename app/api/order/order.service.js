const Order = require('./order.model.js');

exports.insert = (body) => {
    const order = new Order(body);

    try {
        order.save();
    } catch (error) {
        throw Error('Error while inserting new order');
    }
}

exports.get = async function (query) {

    try {
        var orders = await Order.find(query)
        return orders;
    } catch (e) {
        // Log Errors
        throw Error('Error while getting Orders')
    }
}