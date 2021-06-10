const User = require('./user.model.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

exports.login = async function (username, password) {
    const user = await User.findOne({'userName' : username});
    if (user) {
        if (user.password === password) {
            const accessToken = jwt.sign(username, jwtToken);
        return ({user: user.userName, token: accessToken});
        } else {
            throw ({ status: 401, code: 'INCORRECT_PASS', message: 'Incorrect password.' });
        }        
    } else {
        throw ({ status: 401, code: 'INCORRECT_USER', message: 'Username does not exist.' });
    }    
}

exports.insert = async function (body) {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                                    .update(body.password)
                                    .digest("base64");
    body.password = salt + "$" + hash;
    const user = new User(body);

    const existingUser = await User.findOne({$or:[{userName: user.userName},{phone: user.phone},{email: user.email}]});

    if (existingUser) {
        if (existingUser.userName === user.userName) {
            throw ({ status: 400, code: 'USERNAME_ALREADY_EXIST', message: 'New user username already exists.' });
        } else if (existingUser.phone === user.phone) {
            throw ({ status: 400, code: 'PHONE_ALREADY_EXIST', message: 'New user phone number already exists.' });
        } else {
            throw ({ status: 400, code: 'EMAIL_ALREADY_EXIST', message: 'New user email already exists.' });
        }
    } else {
        return user.save();
    }
}

exports.update = async function (id, body) {

    const user = await User.findById(id);
    if (!user) {
        throw ({ status: 404, code: 'USER_NOT_FOUND', message: 'No user found with matching id.' });
    } else {
        user.set(body);
        const existingUser = await User.findOne({$or:[{userName: user.userName},{phone: user.phone},{email: user.email}]});  
        if (existingUser && existingUser._id.toString() !== id) {
            if (existingUser.userName === user.userName) {
                throw ({ status: 400, code: 'USERNAME_ALREADY_EXIST', message: 'New user username already exists.' });
            } else if (existingUser.phone === user.phone) {
                throw ({ status: 400, code: 'PHONE_ALREADY_EXIST', message: 'New user phone number already exists.' });
            } else {
                throw ({ status: 400, code: 'EMAIL_ALREADY_EXIST', message: 'New user email already exists.' });
            }
        } else {
            return user.save();
        }  
    }    
}

exports.delete = async function (id) {
    try {
        const adminCount = await CountAdmins();
        var user = await User.findById(id);
        if (user) {
            if (user.permissionLevel > 0) {
                if (adminCount > 1) {
                    user.delete();
                } else {
                    throw ({ status: 409, code: 'LAST_ADMIN', message: 'Cannot delete last admin.' });
                }
            } else {
                user.delete();
            }
        } else {
            throw ({ status: 404, code: 'USER_NOT_FOUND', message: 'User not found.' });
        }
    } catch (e) {
        throw ({ status: 404, code: 'USER_NOT_FOUND', message: 'User not found.' });
    }
}

const CountAdmins = async function() {
    var refCount = await User.countDocuments( 
        { permissionLevel: 1 }
    ); 

    return refCount;
}
