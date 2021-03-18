module.exports = (app) => {
    app.use('/users', require('./api/user/user.routes.js'));
    app.use('/clients', require('./api/client/client.routes.js'));
    app.use('/orders', require('./api/order/order.routes.js'));    
    app.use('/materials', require('./api/material/material.routes.js'));    
};
