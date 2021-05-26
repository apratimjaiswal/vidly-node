const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, errors, json } = format;

// const logFormat = printf(({ level, message, timestamp, stack }) => {
//     return `${timestamp} ${level}: ${stack || message}`;
// });

function buildProdLogger() {
    return createLogger({
        level: 'info',
        format: combine(
            timestamp(),
            errors({ stack: true }),
            json()
        ),
        defaultMeta: { service: 'user-service' },    
        transports:[new transports.Console()]
    });    
}

module.exports = buildProdLogger;