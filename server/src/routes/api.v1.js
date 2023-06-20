const express = require('express');
const carsRouter = require('./cars.route');
const authRouter = require('./auth.route');

const apiV1 = express.Router();

apiV1.use('/cars', carsRouter);
apiV1.use('/auth', authRouter);

module.exports = apiV1;