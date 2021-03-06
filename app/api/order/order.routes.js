const router = require('express').Router();
const controller = require('./order.controller');
const auth = require('../../middleware/auth/authenticateJWT');
const validator = require('../../middleware/validators/order.validator');

// Insert note
router.post('/', auth.authenticateJWT, validator.orderValidator, controller.insert);

// Retrieve all notes
router.get('/', auth.authenticateJWT, controller.findAll);

// Update a Order with orderId
router.put('/:orderId', auth.authenticateJWT, controller.update);

// Delete a Order with orderId
router.delete('/:orderId', auth.authenticateJWT, controller.delete);

module.exports = router;