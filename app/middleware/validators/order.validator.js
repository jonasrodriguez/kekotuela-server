const {check, validationResult} = require('express-validator');

exports.orderValidator = [
  check('note.reference')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Note reference cannot be empty!')
    .bail(),    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];