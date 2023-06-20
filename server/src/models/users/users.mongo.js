const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 4,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        index: true,
        minLength: 6,
        maxLength: 30
    },
    hashPassword: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true,
        validate: {
            async validator(email) {
                const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return regex.test(email);
            },
            message: (prop) => `${prop.value} is not valid, Please enter a valid email address.`,
        },
    },
    created_At: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updated_At: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
});

userSchema.methods.comparePassword = (password, hasPassword) => {
    return bcrypt.compareSync(password, hasPassword)
}

module.exports = mongoose.model('User', userSchema);