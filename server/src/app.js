const express = require('express');
const jsonwebtoken = require('jsonwebtoken');
const morgan = require('morgan');
const helmet = require('helmet');
const apiV1 = require('./routes/api.v1');

const app = express();

app.use(morgan('combined'));
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
    const [jwt, token] = req.headers.authorization.split(' ');
    if (req.headers && req.headers.authorization && jwt == 'JWT') {
        jsonwebtoken.verify(token, 'ZICRAFTSECRET', (err, decode) => {
            if (err) {
                req.user = undefined;
            } else {
                req.user = decode
                next();
            }
        });
    } else {
        req.user = undefined;
        next();
    }
})
app.use('/v1', apiV1);

module.exports = app;
