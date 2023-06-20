const express = require('express');
const {httpLogin, httpRegister} = require("../controllers/users.controller");

const authRouter = express.Router();

authRouter.post('/login', httpLogin);
authRouter.post('/register', httpRegister);

module.exports = authRouter;