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