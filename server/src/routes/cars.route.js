const express = require('express');
const {httpGetAllCars} = require("../controllers/cars.controller");
const {httpLoginRequired} = require("../controllers/users.controller");


const carsRouter = express.Router();

carsRouter.get('/',httpLoginRequired,httpGetAllCars);

module.exports = carsRouter