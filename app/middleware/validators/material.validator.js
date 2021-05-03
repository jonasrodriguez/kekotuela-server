const {check, validationResult} = require('express-validator');

exports.materialValidator = [
  check('name')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Material name can not be empty!')
    .bail(),
  check('price',
        'Price must be a number greater than 0')
    .isFloat({min:0}), 
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({errors: errors.array()});
    next();
  },
];