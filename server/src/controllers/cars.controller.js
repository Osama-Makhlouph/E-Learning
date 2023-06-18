const {getAllCars} = require('../models/cars.model');

async function httpGetAllCars(req, res) {
    return res.status(200).json(await getAllCars());
}

module.exports = {
    httpGetAllCars
}