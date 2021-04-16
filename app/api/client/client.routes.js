module.exports = (app) => {
    const clients = require('./client.controller.js');

    // Retrieve all Clients
    app.get('/clients', clients.getClients);

    // Create a new Client
    app.post('/clients', clients.create);

    // Retrieve a single Client with noteId
    app.get('/clients/:clientId', clients.findOne);

    // Update a Note with noteId
    app.put('/clients/:clientId', clients.update);

    // Delete a Note with noteId
    app.delete('/clients/:clientId', clients.delete);
}