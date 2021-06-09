const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // if (!config.get("requiresAuth")) return next();
    
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied. No token provided.');

    //Otherwise, we need to verify the token present, that it is a valid Token
    try{
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = decoded; //The decoded payload
        next(); //Need to pass control to the next middleware function in the request handler pipeline
    }catch(ex){
        res.status(400).send('Invalid token.');
    }
}