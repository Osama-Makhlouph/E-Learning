const bcrypt = require('bcrypt');
const {addNewUser, findUser} = require('../models/users/users.model');
const jwt = require('jsonwebtoken');

function httpLoginRequired(req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({message: "Unauthorized user!"})
    }
}

async function httpRegister(req, res) {
    try {
        const savedUser = await addNewUser(req.body);
        return res.status(201).json(savedUser);
    }
    catch (err){
        return res.status(400).json({message: err.message});
    }
}

async function httpLogin(req, res) {
    console.log(req.body);
    try {
        const user = await findUser(req.body.email);
        if (!user) {
            return res.status(401).json({message: 'Authentication failed, no user found!'});
        }
        if (!user.comparePassword(req.body.password, user.hashPassword)) {
            return res.status(401).json({message: 'Authentication failed, wrong password!'});
        }
        return res.status(200).json(jwt.sign({
            username: user.username,
            email: user.email,
            _id: user.id
        }, 'ZICRAFTSECRET'));

    } catch (err) {
        return res.status(400).json({message: err.message});
    }
}

module.exports = {
    httpRegister,
    httpLoginRequired,
    httpLogin
}


