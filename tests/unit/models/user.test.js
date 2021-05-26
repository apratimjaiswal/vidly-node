const { User } = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => {
    it('should return a valid JWT', () => {
        //const user = new User({ _id: 1, isAdmin: true });
        const payload = { 
            _id: mongoose.Types.ObjectId().toHexString(), 
            isAdmin: true 
        };
        const user = new User(payload);

        //  Function that we need to test
        const token = user.generateAuthToken();
        
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));

        //  Assertion that we are making
        expect(decoded).toMatchObject(payload);
    });
});