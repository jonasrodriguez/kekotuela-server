const Material = require('./material.model.js');

function FillMaterialData(data) {
    return new Material({
        name: data.name,
        reference: data.reference,
        price: data.price,
        comment: data.comment
    });
};

exports.insert = (body) => {
    Material.create(body); 
    /*try {
        const material = new Material(body);
        material.save();
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};
      
            Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
            });
      
            throw Error(errors)
          }
        throw Error('Error while inserting new material');
    }*/
}

exports.get = async function (query) {
    try {
        var materials = await Material.find(query)
        return materials;
    } catch (e) {        
        throw Error('Error while getting Material')
    }
}
