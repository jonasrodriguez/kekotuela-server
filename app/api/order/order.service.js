const Order = require('./order.model');
const ObjectID = require('mongodb').ObjectID;

const CreateReferenceNum = async () => {
    const today = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate(), 0, 0, 0);
    const tomorrow = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate() + 1, 0, 0, 0);

    var refCount = await Order.countDocuments( 
        { createdAt: {
            $gte: today,
            $lte: tomorrow
        }}
    ); 

    return "P_" + today.getFullYear() + ("0" + (today.getMonth() + 1)).slice(-2) + ("0" + today.getDate()).slice(-2) + "_" + refCount;
}

function FillOrderData(data) {
    return new Order({    
        reference: data.reference,
        note: ObjectID(data.noteId),
        materials: data.materials,
        photoBefore: data.photoBeforePath,
        photoAfter: data.photoAfterPath,
        comments: data.comments,
        signClient: data.signClientPath,
        signUser: data.signUserPath,
        total: data.total
    });
};

exports.insert = async (body) => {    
    body.reference = await CreateReferenceNum();
    const order = FillOrderData(body);
    order.save();
}

exports.update = async function (id, body) {
    const order = await Order.findById(id);
    if (!order) {
        throw ({ status: 404, code: 'ORDER_NOT_FOUND', message: 'No order found with matching id.' });
    } else {
        order.set(body);
        return order.save();
    }    
}

exports.delete = async function(id) {
    const order = await Order.findById(id);
    if (!order) {
        throw ({ status: 404, code: 'ORDER_NOT_FOUND', message: 'No order found with matching ID.' });
    } else {
        order.remove();
    }
}
