const {check, validationResult} = require('express-validator');

exports.noteValidator = [
  check('clientId')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Client reference cannot be empty!')
    .bail(),    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];