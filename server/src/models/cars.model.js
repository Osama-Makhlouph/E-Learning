const fs = require('fs');
const path = require('path');
const {parse} = require('csv-parse');
const carsModel = require('./cars.mongo');
function convertPriceToNumber(carPrice) {
    return +carPrice.slice(1);
}
async function upsertCarsData(car) {
    try {
        await carsModel.updateOne({
            carMake: car.carMake,
            carModel: car.carModel,
            carModelYear: car.carModelYear,
            price: convertPriceToNumber(car.price),
        }, {
            carMake: car.carMake,
        }, {
            upsert: true
        });
    } catch (err) {
        console.log(err.message);
    }
}

async function logLoadedCarsCount(resolve) {
    try {
        const carsCount = await carsModel.find({}).count();
        console.log(`Loaded ${carsCount} in the database`);
        resolve();
    } catch (err) {
        console.log(err.message);
    }
}

async function loadCarsDataIntoDB() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname, '..', 'data', 'cars.csv'))
            .pipe(parse({
                columns: true,
                comment: '#'
            }))
            .on('data', async (car) => {
                await upsertCarsData(car);
            })
            .on('error', (error) => {
                reject(error);
            })
            .on('end', async () => {
                await logLoadedCarsCount(resolve);
            });
    });
}

async function getAllCars() {
    return carsModel.find({}, {__v: 0});
}

module.exports = {
    loadCarsDataIntoDB,
    getAllCars
}