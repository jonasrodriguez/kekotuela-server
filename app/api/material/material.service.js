const Material = require('./material.model.js');

exports.insert = (body) => {
    const material = new Material(body);

    try {
        material.save();
    } catch (error) {
        throw Error('Error while inserting new material');
    }
}

exports.get = async function (query) {

    try {
        var materials = await Material.find(query)
        return materials;
    } catch (e) {
        throw Error('Error while getting Material')
    }
}