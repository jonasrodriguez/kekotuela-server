module.exports = (app) => {
    const clients = require('./client.controller.js');

    // Create a new Client
    app.post('/clients', clients.create);

    // Retrieve all Notes
    app.get('/clients', clients.findAll);

    // Retrieve a single Client with noteId
    app.get('/clients/:clientId', clients.findOne);

    // Update a Note with noteId
    app.put('/clients/:clientId', clients.update);

    // Delete a Note with noteId
    app.delete('/clients/:clientId', clients.delete);
}