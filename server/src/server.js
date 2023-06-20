const https = require('https');
const fs = require('fs');
const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');
const {loadCarsDataIntoDB} = require('./models/cars.model');

const server = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);
const PORT = process.env.PORT || 8000;

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.log(err.message);
    }
}

async function startServer() {
    await connectToMongoDB();
    await loadCarsDataIntoDB();
    server.listen(PORT, () => {
        console.log(`The server started on port:${PORT}`);
    });
}

startServer();
