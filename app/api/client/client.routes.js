const router = require('express').Router();
const controller = require('./client.controller.js');

// Retrieve all Clients
router.get('/', controller.getClients);

// Create a new Client
router.post('/', controller.create);

// Retrieve a single Client with noteId
router.get('/:clientId', controller.findOne);

// Update a Note with noteId
router.put('/:clientId', controller.update);

// Delete a Note with noteId
router.delete('/:clientId', controller.delete);

module.exports = router;