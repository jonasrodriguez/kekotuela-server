const Service = require('./service.model.js');

exports.insert = async function (body) {

    const service = new Service(body);
    const existingMat = await Service.findOne({name: service.name});

    if (existingMat) {
        throw ({ status: 400, code: 'SERVICE_ALREADY_EXIST', message: 'New service name already exists.' });
    } else {
        return service.save();
    }
}

exports.update = async function (id, body) {
    const service = await Service.findById(id);
    if (!service) {
        throw ({ status: 404, code: 'SERVICE_NOT_FOUND', message: 'No service found with matching id.' });
    } else {
        service.set(body);
        const existingMat = await Service.findOne({name: service.name});
        if (existingMat && existingMat._id.toString() !== id) {
            throw ({ status: 400, code: 'SERVICE_ALREADY_EXIST', message: 'New service name already exists.' });
        } else {            
            return service.save();
        }  
    }    
}

exports.delete = async function(id) {
    const service = await Service.findById(id);
    if (!service) {
        throw ({ status: 404, code: 'SERVICE_NOT_FOUND', message: 'No service found with matching ID.' });
    } else {
        service.remove();
    }
}
