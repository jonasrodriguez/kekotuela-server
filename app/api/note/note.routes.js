const router = require('express').Router();
const controller = require('./note.controller.js');

// Get all notes
router.get('/', controller.findAll);

// Create a new note
router.post('/', controller.addOrder);

module.exports = router;