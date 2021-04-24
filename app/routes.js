const router = require('express').Router();
        
router.use('/clients', require('./api/client/client.routes'));

//router.use('/orders', require('./api/order/order.routes'));

router.use('/materials', require('./api/material/material.routes'));

router.use('/users', require('./api/user/user.routes'));

router.use('/notes', require('./api/note/note.routes')); 

module.exports = router;