require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
require('dotenv').config();
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
//const joiObjectid = require('joi-objectid');
const express = require('express');
const app = express();

// require('./startup/logging');
// require('./startup/routes')(app);
// require('./startup/db')();
// require('./startup/config')();

process.on('uncaughtException', (ex) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION');
    winston.error(ex.message, {metadata: ex.stack});
    process.exit(1);
});

//winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }))     // handleExceptions will be deprecated in winston version 4

process.on('unhandledRejection', (ex) => {
    console.log('WE GOT AN UNHANDLED REJECTION');
    winston.error(ex.message, {metadata: ex.stack});
    process.exit(1);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({ 
    db: 'mongodb://localhost/vidly',
    level: 'error'  //  Nothing beyond error level will be logged in MongoDB
}));

//throw new Error('Something failed during startup.');
// const p = Promise.reject(new Error('Something failed miserably'));
// p.then(() => console.log());


//Configurations
//console.log('Port is ', process.env.PORT);
//console.log('Environment is: ', process.env.NODE_ENV);
//console.log('app.get(env) is: ', app.get('env'));
//console.log('Application Name: ' + config.get('name'));
//console.log('Application jwtPrivateKey is: ' + config.get('jwtPrivateKey'));
if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/vidly')  //connection string
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

//Routes and Middleware functions    
app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));