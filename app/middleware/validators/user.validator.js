const {check, validationResult} = require('express-validator');

exports.userValidator = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User name can not be empty!')
    .bail(),
  check('userName')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('UserName can not be empty!')
    .bail(),
  check('password')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User password can not be empty!')
    .bail(),    
  check('phone')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('User phone can not be empty!')
    .bail(),      
  check('email')
    .trim()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage('Invalid email address!')
    .bail(),
  check('permissionLevel')
    .isFloat({min:0, max:1})
    .withMessage('Invalid permissionLevel value!')
    .bail(),    
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];