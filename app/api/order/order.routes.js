module.exports = (app) => {
    const controller = require('./order.controller.js');

    // Insert orders
    app.post('/orders', controller.addOrder);

    // Retrieve all orders    
    app.get('/orders', controller.findAll);

    //app.get('/orders', orders.getOrders);
}