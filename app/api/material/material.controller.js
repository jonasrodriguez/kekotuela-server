const Service = require('./material.service.js');
const Material = require('./material.model');

exports.addMaterials = async function (req, res) {
    try {
        var user = Service.insert(req.body);
        return res.status(200).json({ status: 200, data: user, message: "Material added succesfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
};

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

/*exports.getMaterials = async function (req, res) {
    try {
        var users = await Service.get({})
        return res.status(200).json({ status: 200, data: users, message: "Material Succesfully Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}*/

exports.getMaterials = (req, res) => {
    try {
        var materials = Service.f();
        return res.status(200).json({ status: 200, data: user, message: "Material added succesfully"});
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }

    /*if(Object.keys(req.query).length === 0) {
        try {
            var materials = Service.findAll();
            return res.status(200).json({ status: 200, data: user, message: "Material added succesfully"});
        } catch (e) {
            return res.status(400).json({ status: 400, message: e.message });
        }
    }
    else {
        findClients(req, res);
    }    */
};

// Update a Material identified by the materialId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Material content can not be empty"
        });
    }

    // Find client and update it with the request body
    Material.findByIdAndUpdate(req.params.materialId, {
        content: req.body.content
    }, {new: true})
    .then(material => {
        if(!material) {
            return res.status(404).send({
                message: "Material not found with id " + req.params.materialId
            });
        }
        res.send(material);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Material not found with id " + req.params.materialId
            });                
        }
        return res.status(500).send({
            message: "Error updating material with id " + req.params.materialId
        });
    });
};

// Delete a Material with the specified materialId in the request
exports.delete = (req, res) => {
    Material.findByIdAndRemove(req.params.materialId, { useFindAndModify: false })
    .then(material => {
        if(!material) {
            return res.status(404).send({
                message: "Material not found with id " + req.params.materialId
            });
        }
        res.send({message: "Material deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Material not found with id " + req.params.materialId
            });                
        }
        return res.status(500).send({
            message: "Could not delete material with id " + req.params.materialId
        });
    });
};