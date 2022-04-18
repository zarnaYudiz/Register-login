const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet'); //helps you secure your Express apps by setting various HTTP headers
const cors = require('cors');
const morgan = require('morgan'); //HTTP request logger middleware for node.js
const path = require('path');
const routes = require('./app/routers');
const env = require('./config');
require('./database/mongoose')

const app = express();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Verification', 'x-forwarded-for'],
    exposedHeaders: ['Authorization', 'Verification', 'x-forwarded-for'],
};

const routeConfig = (req, res, next) => {
    if (req.path === '/ping') return res.status(200).send({});
    res.reply = ({ code, prefix, message }, data = {}, header = undefined) => {
        if (prefix) {
            message = prefix + message;
        }
        return res.status(code).header(header).json({ message, data });
    };
    next();
};

const routeHandler = function (req, res) {
    res.status(404);
    res.send({ message: 'Route not found' });
};

const logErrors = function (err, req, res, next) {
    console.error(`${req.method} ${req.url}p`);
    console.error('body -> ', req.body);
    console.error(err.stack);
    return next(err);
};

const errorHandler = function (err, req, res, next) {
    res.status(500);
    res.send({ message: err });
};

app.set('view engine', 'ejs');
app.use(cors(corsOptions));
app.use(helmet());      
app.use(bodyParser.json({ limit: '16mb' }));
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true, parameterLimit: 50000 }));   //TODO
if (env.NODE_ENV !== 'prod' && env.NODE_ENV !== 'stag') app.use(morgan('dev', { skip: (req) => req.path === '/ping' || req.path === '/favicon.ico' }));
app.use(express.static('./seeds'));
app.use(routeConfig);
app.use('/api/v1', routes);
app.use('*', routeHandler);
app.use(logErrors);
app.use(errorHandler);

app.listen(process.env.PORT, function(req,res){
    console.yellow(`Spinning on ${env.PORT}`);
})