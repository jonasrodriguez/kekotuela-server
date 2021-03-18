module.exports = (app) => {
    const orders = require('./order.controller.js');

    // Insert orders
    app.post('/orders', orders.addOrder);

    // Retrieve all orders
    app.get('/orders', orders.getOrders);
}