const router = require('express').Router();
const controller = require('./user.controller.js');

// Retrieve all users
router.get('/', controller.findAll);

// Insert user
router.post('/', controller.insert);

module.exports = router;