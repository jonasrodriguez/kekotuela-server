const Service = require('./service.service.js');
const Model = require('./service.model');

exports.findAll = (req, res) => {
    Model.find(req.query)
    .then(service => {
        res.send(service);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the services."
        });
    });
};

exports.insert = async function (req, res, next) {
    try {
        const service = await Service.insert(req.body);
        return res.status(201).json({ data: service, message: "Service added succesfully"});
    } catch (e) {
        next(e);
    }
};

exports.update = async function (req, res, next) {
    try {
        const service = await Service.update(req.params.serviceId, req.body);
        return res.status(200).json({ data: service, message: "Service updated succesfully"});
    } catch (e) {
        next(e);
    }
}; 

exports.delete = async function (req, res, next) {
    try {
        await Service.delete(req.params.serviceId);
        return res.status(200).json({ message: "Service deleted succesfully" });
    } catch (e) {
        next(e);
    }
};
