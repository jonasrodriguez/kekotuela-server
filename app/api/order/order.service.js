const Order = require('./order.model.js');
const ObjectID = require('mongodb').ObjectID;

function FillOrderData(data) {
    return new Order({        
        client: ObjectID(data.clientId),
        user: (data.userId) ? ObjectID(data.userId) : null,        
        readableId: data.readableId,
        priority: data.priority,
        description: data.description,
        orderDate: data.orderDate
    });
};

exports.insert = (body) => {    
    try {                     
        const order = FillOrderData(body);
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
        throw Error('Error while getting Orders')
    }
}