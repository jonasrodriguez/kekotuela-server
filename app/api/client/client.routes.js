const router = require('express').Router();
const controller = require('./client.controller.js');
const validator = require('../../middleware/validators/client.validator');
const auth = require('../../middleware/auth/authenticateJWT');

// Retrieve all Clients
router.get('/', auth.authenticateJWT, controller.getClients);

// Create a new Client
router.post('/', auth.authenticateJWT, validator.clientValidator, controller.create);

// Retrieve a single Client with noteId
router.get('/:clientId', auth.authenticateJWT, controller.findOne);

// Update a Client with clientId
router.put('/:clientId', auth.authenticateJWT, validator.clientValidator, controller.update);

// Delete a Client with clientId
router.delete('/:clientId', auth.authenticateJWT, controller.delete);

module.exports = router;