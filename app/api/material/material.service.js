const Material = require('./material.model.js');

exports.insert = async function (body) {

    const material = new Material(body);
    const existingMat = await Material.findOne({$or:[{name: material.name},{reference: material.reference}]});

    if (existingMat) {
        if (existingMat.name === material.name) {
            throw ({ status: 400, code: 'MATERIAL_ALREADY_EXIST', message: 'New material name already exists.' });
        } else {
            throw ({ status: 400, code: 'MATERIAL_REFERENCE_ALREADY_EXIST', message: 'New material reference already exists.' });
        }
    } else {
        return material.save();
    }
}

exports.update = async function (id, body) {
    const material = await Material.findById(id);
    if (!material) {
        throw ({ status: 404, code: 'MATERIAL_NOT_FOUND', message: 'No material found with matching id.' });
    } else {
        material.set(body);
        const existingMat = await Material.findOne({$or:[{name: material.name},{reference: material.reference}]});
        if (existingMat && existingMat._id.toString() !== id) {
            if (existingMat.name === material.name) {
                throw ({ status: 400, code: 'MATERIAL_ALREADY_EXIST', message: 'New material name already exists.' });
            } else {
                throw ({ status: 400, code: 'MATERIAL_REFERENCE_ALREADY_EXIST', message: 'New material reference already exists.' });
            }
        } else {            
            return material.save();
        }  
    }    
}

exports.delete = async function(id) {
    const material = await Material.findById(id);
    if (!material) {
        throw ({ status: 404, code: 'MATERIAL_NOT_FOUND', message: 'No material found with matching ID.' });
    } else {
        material.remove();
    }
}
