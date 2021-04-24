const router = require('express').Router();
const controller = require('./note.controller.js');

// Insert note
router.post('/', controller.insert);

// Retrieve all notes
router.get('/', controller.findAll);

module.exports = router;