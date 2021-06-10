const Client = require('./client.model.js').ClientModel;

exports.insert = async function (body) {
    const client = new Client(body);
    const existingClient = await Client.findOne({$or:[{dni: client.dni},{phone: client.phone},{email: client.email}]});

    if (existingClient) {
        if (existingClient.dni === client.dni) {
            throw ({ status: 400, code: 'ID_ALREADY_EXIST', message: 'New client id already exists.' });
        } else if (existingClient.phone === client.phone) {
            throw ({ status: 400, code: 'PHONE_ALREADY_EXIST', message: 'New client phone number already exists.' });
        } else {
            throw ({ status: 400, code: 'EMAIL_ALREADY_EXIST', message: 'New client email already exists.' });
        }
    } else {
        return client.save();
    }
}

exports.update = async function (id, body) {
    const client = await Client.findById(id);
    if (!client) {
        throw ({ status: 404, code: 'CLIENT_NOT_FOUND', message: 'No client found with matching id.' });
    } else {
        client.set(body);
        const existingClient = await Client.findOne({$or:[{dni: client.dni},{phone: client.phone},{email: client.email}]});
        if (existingClient && existingClient._id.toString() !== id) {
            if (existingClient.dni === client.dni) {
                throw ({ status: 400, code: 'ID_ALREADY_EXIST', message: 'New client id already exists.' });
            } else if (existingClient.phone === client.phone) {
                throw ({ status: 400, code: 'PHONE_ALREADY_EXIST', message: 'New client phone number already exists.' });
            } else {
                throw ({ status: 400, code: 'EMAIL_ALREADY_EXIST', message: 'New client email already exists.' });
            }
        } else {            
            return client.save();
        }  
    }    
}

exports.delete = async function(id) {
    const client = await Client.findById(id);
    if (!client) {
        throw ({ status: 404, code: 'CLIENT_NOT_FOUND', message: 'No client found with matching id.' });
    } else {
        client.remove();
    }
}