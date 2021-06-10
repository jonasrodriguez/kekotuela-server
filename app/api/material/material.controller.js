const Service = require('./material.service.js');
const Material = require('./material.model');

exports.findAll = (req, res) => {
    Material.find()
    .then(Material => {
        res.send(Material);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the materials."
        });
    });
};

exports.addMaterials = async function (req, res, next) {
    try {
        var material = await Service.insert(req.body);
        return res.status(201).json({ data: material, message: "Material added succesfully"});
    } catch (e) {
        next(e);
    }
};

exports.update = async function (req, res, next) {
    try {
        var material = await Service.update(req.params.materialId, req.body);
        return res.status(200).json({ data: material, message: "Material updated succesfully"});
    } catch (e) {
        next(e);
    }
}; 

exports.delete = async function (req, res, next) {
    try {
        await Service.delete(req.params.materialId);
        return res.status(200).json({ message: "Material deleted succesfully" });
    } catch (e) {
        next(e);
    }
};
