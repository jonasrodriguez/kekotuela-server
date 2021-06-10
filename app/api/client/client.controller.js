const Client = require('./client.model.js').ClientModel;
const Service = require('./client.service.js')

exports.getClients = (req, res) => {
    if(Object.keys(req.query).length === 0) {
        findAll(res);
    }
    else {
        findClients(req, res);
    }    
};

const findAll = (res) => {
    Client.find().then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
};

const findClients = (req, res) => {
    const reg = new RegExp(req.query.filter, 'i');
    Client.find({$or: [
            {'name': reg},
            {'surname': reg}]})
        .then(clients => { res.send(clients); });
};

// Find a client with a clientId
exports.findOne = (req, res) => {
    Client.findById(req.params.clientId).then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });            
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving client with id " + req.params.clientId
        });
    });
};

exports.create = async (req, res, next) => {
    try {
        var client = await Service.insert(req.body);
        return res.status(200).json({ data: client, message: "Client succesfully added" });
    } catch (e) {
        next(e);
    }
};

exports.update = async function (req, res, next) {
    try {
        var client = await Service.update(req.params.clientId, req.body);
        return res.status(200).json({ data: client, message: "Material updated succesfully"});
    } catch (e) {
        next(e);
    }
}; 

exports.delete = async function (req, res, next) {
    try {
        await Service.delete(req.params.clientId);
        return res.status(200).json({ message: "Client deleted successfully"});
    } catch (e) {
        next(e);
    }
};
