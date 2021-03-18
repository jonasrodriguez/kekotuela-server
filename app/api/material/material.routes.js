module.exports = (app) => {
    const materials = require('./material.controller.js');

    // Insert material
    app.post('/materials', materials.addMaterials);

    // Retrieve all materials
    app.get('/materials', materials.getMaterials);
}