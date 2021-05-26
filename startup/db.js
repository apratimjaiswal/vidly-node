//const winston = require('winston');
const logger = require('../logger');
const mongoose = require('mongoose');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db, { //connection string
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => logger.info(`Connected to ${db}...`));
    //.then(() => console.log('Connected to MongoDB...'))
    //.catch(err => console.error('Could not connect to MongoDB...'));  //  Unhandled Promise Rejections will be taken care of as per our current winston logging implementation
}