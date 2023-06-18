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

async function startServer(){
    await mongoose.connect(process.env.MONGO_URL);
    await loadCarsDataIntoDB();
    server.listen(PORT, () => {
        console.log(`The server started on port:${PORT}`);
    });
}

startServer();
