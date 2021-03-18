const Client = require('./client.model.js');
const Service = require('./client.service.js')

// Create and Save a new Client
exports.create = async (req, res) => {
    try {
        var client = await Service.create(req.body);
        return res.status(200).json({ status: 200, data: client, message: "Client succesfully added" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

// Retrieve and return all Clients from the database.
exports.findAll = (req, res) => {
    Client.find().then(clients => {
        res.send(clients);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
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

// Update a Client identified by the clientId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Client content can not be empty"
        });
    }

    // Find client and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId, {
        title: req.body.title || "Untitled Client",
        content: req.body.content
    }, {new: true})
    .then(client => {
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
            message: "Error updating client with id " + req.params.clientId
        });
    });
};

// Delete a Client with the specified clientId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client) {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send({message: "Client deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });                
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.clientId
        });
    });
};