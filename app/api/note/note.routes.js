const router = require('express').Router();
const controller = require('./note.controller.js');
const auth = require('../../middleware/auth/authenticateJWT');

// Get all notes
router.get('/', auth.authenticateJWT, controller.findAll);

// Create a new note
router.post('/', auth.authenticateJWT, controller.add);

// Update a note with noteId
router.put('/:noteId', auth.authenticateJWT, controller.update);

// Delete a note with noteId
router.delete('/:noteId', auth.authenticateJWT, controller.delete);

module.exports = router;