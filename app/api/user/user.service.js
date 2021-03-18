const User = require('./user.model.js');
const crypto = require('crypto');

exports.insert = (body) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                    .update(body.password)
                                    .digest("base64");
    body.password = salt + "$" + hash;

    const user = new User(body);

    try {
        user.save();
    } catch (error) {
        throw Error('Error while inserting new user');
    }
}

exports.getUsers = async function (query) {

    try {
        var users = await User.find(query)
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while getting Users')
    }
}