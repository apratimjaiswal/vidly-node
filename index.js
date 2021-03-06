//const winston = require('winston');
const express = require('express');
const app = express();
const config = require("config");

//require('./startup/logging')();
//const logger = require('./logger/dev-logger');
const logger = require('./logger');
require("./startup/cors")(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

//    throw new Error('Something failed during startup.');
//   const p = Promise.reject(new Error('Something failed miserably'));
//   p.then(() => console.log());

const port = process.env.PORT || config.get("port");
//app.listen(port, () => winston.info(`Listening on port ${port}...`));
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;