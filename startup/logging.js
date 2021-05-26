const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    // process.on('uncaughtException', (ex) => {
    //     console.log('WE GOT AN UNCAUGHT EXCEPTION');
    //     winston.error(ex.message, {metadata: ex.stack});
    //     process.exit(1);
    // });
    
    //winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log' }))     // handleExceptions will be deprecated in winston version 4
    // winston.exceptions.handle(new winston.transports.File({ 
    //     filename: 'uncaughtExceptions.log',
    //     handleExceptions: true
    // }));
    //winston.rejections.handle(new winston.transports.File({ filename: 'uncaughtRejections.log' }));
    winston.add(new winston.transports.File({ 
        filename: 'uncaughtExceptions.log',
        handleExceptions: true,
    }));
    winston.add(new winston.transports.Console({colorize: true, prettyPrint: true}));
    winston.add(new winston.transports.File({
        filename: 'uncaughtRejections.log',
        handleRejections: true
    }));  

    // process.on('unhandledRejection', (ex) => {
    //     console.log('WE GOT AN UNHANDLED REJECTION');
    //     winston.error(ex.message, {metadata: ex.stack});
    //     process.exit(1);
    // });
    
    //winston.add(new winston.transports.File({ filename: 'logError.log', level: 'error'}));
    //winston.add(new winston.transports.File({ filename: 'logAll.log'}));
    winston.add(new winston.transports.MongoDB({ 
        db: 'mongodb://localhost/vidly',
        level: 'error'  //  Nothing beyond error level will be logged in MongoDB
    }));
}