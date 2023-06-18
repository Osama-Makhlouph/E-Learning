const mongoose = require('mongoose');
const carsSchema = new mongoose.Schema({
    carMake: {
        type: String,
        required: true
    },
    carModel: {
        type: String,
        required: true
    },
    carModelYear: {
        type: Date,
        required: true
    },
    price: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    created_At: {
        type: Date,
        default:Date.now()
    },
    updated_At: {
        type: Date,
        default:Date.now()
    },
});

module.exports = mongoose.model('Car', carsSchema);