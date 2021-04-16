module.exports = (app) => {
    const users = require('./user.controller.js');

    // Retrieve all users
    app.get('/users', users.findAll);

    // Insert user
    app.post('/users', users.insert);

    // Retrieve a single Client with noteId
    //app.get('/clients/:clientId', clients.findOne);

    // Update a Note with noteId
    //app.put('/clients/:clientId', clients.update);

    // Delete a Note with noteId
    //app.delete('/clients/:clientId', clients.delete);
}