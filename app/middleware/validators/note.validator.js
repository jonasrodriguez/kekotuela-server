const {check, validationResult} = require('express-validator');

exports.noteValidator = [
  check('description')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Note description cannot be empty!')
    .bail(),
  check('client.name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Client name cannot be empty!')
    .bail(),          
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];