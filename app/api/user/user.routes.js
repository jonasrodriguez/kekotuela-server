module.exports = (app) => {
    const users = require('./user.controller.js');

    // Insert user
    app.post('/users', users.insert);

    // Retrieve all Notes
    app.get('/users', users.getUsers);

    // Retrieve a single Client with noteId
    //app.get('/clients/:clientId', clients.findOne);

    // Update a Note with noteId
    //app.put('/clients/:clientId', clients.update);

    // Delete a Note with noteId
    //app.delete('/clients/:clientId', clients.delete);
}