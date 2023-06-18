const express = require('express');
const apiV1 = require('./routes/api.v1');

const app = express();

app.use('/v1', apiV1);

module.exports = app;
