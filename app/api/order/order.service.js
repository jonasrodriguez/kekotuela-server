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
    try {          
        body.reference = await CreateReferenceNum();
        const order = FillOrderData(body);
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
