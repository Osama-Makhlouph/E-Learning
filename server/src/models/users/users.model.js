const bcrypt = require('bcrypt');
const usersModel = require('./users.mongo');

async function addNewUser(user) {
    if(!user.password){
        throw new Error('Password required!');
    }
    const newUser = await usersModel.create(user);
    newUser.hashPassword = bcrypt.hashSync(user.password,12);
    await newUser.save();
    newUser.hashPassword = undefined;
    return newUser;
}

async function findUser(email) {
    return usersModel.findOne({email: email});
}
module.exports = {
    addNewUser,
    findUser
}