const express = require('express');
const {httpGetAllCars} = require("../controllers/cars.controller");


const carsRouter = express.Router();

carsRouter.get('/',httpGetAllCars);

module.exports = carsRouter