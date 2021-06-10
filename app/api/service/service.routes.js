const router = require('express').Router();
const controller = require('./service.controller.js');
const validator = require('../../middleware/validators/service.validator');
const auth = require('../../middleware/auth/authenticateJWT');

// Retrieve all materials
router.get('/', auth.authenticateJWT, controller.findAll);

// Insert service
router.post('/', auth.authenticateJWT, validator.serviceValidator, controller.insert);

// Update a Material with serviceId
router.put('/:serviceId', auth.authenticateJWT, validator.serviceValidator, controller.update);

// Delete a Material with serviceId
router.delete('/:serviceId', auth.authenticateJWT, controller.delete);

module.exports = router;