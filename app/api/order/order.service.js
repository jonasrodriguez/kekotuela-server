const Order = require('./order.model');
const ObjectID = require('mongodb').ObjectID;

function FillOrderData(data) {
    return new Order({    
        redeableId: data.redeableId,
        note: ObjectID(data.orderId),
        materials: data.materials,
        photoBefore: data.photoBeforePath,
        photoAfter: data.photoAfterPath,
        comments: data.comments,
        signClient: data.signClientPath,
        signUser: data.signUserPath
    });
};

exports.insert = (body) => {    
    try {                     
        const order = new Order(body);
        order.save();
    } catch (error) {
        throw Error('Error while inserting new Order');
    }
}

exports.get = async function (query) {
    try {
        return await Order.find(query);
    } catch (e) {
        throw Error('Error while getting Orders');
    }
}

exports.findAll = async function () {
    try {
        return await Order.find();
    } catch (e) {
        throw Error('Error while getting Orders');
    }
}
