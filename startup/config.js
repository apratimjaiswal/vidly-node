const config = require('config');
require('dotenv').config();

module.exports = function() {
    //Configurations
    //console.log('Port is ', process.env.PORT);
    //console.log('Environment is: ', process.env.NODE_ENV);
    //console.log('app.get(env) is: ', app.get('env'));
    //console.log('Application Name: ' + config.get('name'));
    //console.log('Application jwtPrivateKey is: ' + config.get('jwtPrivateKey'));
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
        //console.error('FATAL ERROR: jwtPrivateKey is not defined.');
        //process.exit(1);
    }
}