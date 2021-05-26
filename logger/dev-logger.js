const winston = require('winston');
//require('winston-mongodb');
require('express-async-errors');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf, prettyPrint } = format;

function buildDevLogger() {
    const logFormat = printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} ${level}: ${stack || message}`;
    });
    
    return createLogger({
        level: 'warn',
        //format: winston.format.simple(),
        //format: logFormat,
        //format: combine(timestamp(), logFormat),
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            format.errors({ stack: true }),
            logFormat),
        defaultMeta: { service: 'user-service' },    
        transports:[
            new transports.Console({ colorize: true, prettyPrint: true, handleExceptions: true, handleRejections: true, level: 'info' }),
            //new transports.File({ filename: 'combined.log', handleExceptions: true }),
            new transports.File({ filename: 'uncaughtExceptions.log', handleExceptions: true }),
            new transports.File({ filename: 'uncaughtRejections.log', handleRejections: true }),
            // new transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'error' })
        ],
        //exceptionHandlers: [new transports.File({ filename: 'exceptions.log' })],
        //rejectionHandlers: [new transports.File({ filename: 'rejections.log' })]
    });    
}

module.exports = buildDevLogger;