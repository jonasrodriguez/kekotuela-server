const Client = require('./client.model.js');

exports.create = async function (body) {
    if(!body.name) {
        throw Error('Name cannot be empty');
    }

    const client = new Client({
        name: body.name,
        surname: body.surname,
        second_surname: body.second_surname,
        dni: body.dni,
        phone: body.phone,
        address: body.address,
        cp: body.cp,
        city: body.city,
        email: body.email,
        comment: body.comment
    });

    try {
        client.save();
    } catch (error) {
        throw Error('Error while inserting new client');
    }
}