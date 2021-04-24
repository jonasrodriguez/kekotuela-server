const router = require('express').Router();
const controller = require('./material.controller.js');
const validator = require('../../middleware/validators/material');

// Insert material
router.post('/', validator.materialValidator, controller.addMaterials);

// Retrieve all materials
router.get('/', controller.findAll);

module.exports = router;