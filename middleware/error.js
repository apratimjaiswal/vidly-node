//const winston = require('winston');
const logger = require('../logger');

module.exports = function(err, req, res, next){
    //  Log the exception
    //logger.error(err.message, {metadata: err.stack});
    logger.error(err.message, err);
    //winston.error(err.message, err);
    res.status(500).send('Something failed.');    
}