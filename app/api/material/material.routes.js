const router = require('express').Router();
const controller = require('./material.controller.js');
const validator = require('../../middleware/validators/material.validator');
const auth = require('../../middleware/auth/authenticateJWT');

// Insert material
router.post('/', auth.authenticateJWT, validator.materialValidator, controller.addMaterials);

// Retrieve all materials
router.get('/', auth.authenticateJWT, controller.findAll);

// Update a Material with materialId
router.put('/:materialId', auth.authenticateJWT, controller.update);

// Delete a Material with materialId
router.delete('/:materialId', auth.authenticateJWT, controller.delete);

module.exports = router;