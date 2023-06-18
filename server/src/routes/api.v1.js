const express = require('express');
const carsRouter = require('./cars.route');

const apiV1 = express.Router();

apiV1.use('/cars', carsRouter);

module.exports = apiV1;