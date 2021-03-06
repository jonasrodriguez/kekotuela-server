const router = require('express').Router();

router.use('/users', require('./api/user/user.routes'));

router.use('/clients', require('./api/client/client.routes'));

router.use('/materials', require('./api/material/material.routes'));

router.use('/services', require('./api/service/service.routes'));

router.use('/notes', require('./api/note/note.routes')); 

router.use('/orders', require('./api/order/order.routes'));


module.exports = router;