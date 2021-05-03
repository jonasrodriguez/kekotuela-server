const router = require('express').Router();
const controller = require('./user.controller.js');
const validator = require('../../middleware/validators/user.validator');
const auth = require('../../middleware/auth/authenticateJWT');

// Retrieve all users
router.get('/', auth.authenticateJWT, controller.findAll);

// Insert user
router.post('/', auth.authenticateJWT, validator.userValidator, controller.insert);

// Update a user with userId
router.put('/:userId', auth.authenticateJWT, validator.userValidator, controller.update);

// Delete a user with userId
router.delete('/:userId', auth.authenticateJWT, controller.delete);

// Login
router.post('/login', controller.login);

module.exports = router;