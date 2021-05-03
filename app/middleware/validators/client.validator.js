const {check, validationResult} = require('express-validator');

exports.clientValidator = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Client name can not be empty!')
    .bail(),
  check('surname')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Client surname can not be empty!')
    .bail(),
  check('phone')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Client phone can not be empty!')
    .bail(),      
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];