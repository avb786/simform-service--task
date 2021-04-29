const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
require('dotenv').config();

exports.funcUtility = {
    msgCons: require('../utils/constants/msgConstants'),
    routeCons: require('../utils/constants/routeConstants'),
    validPassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword);
    },
    hashPassword: (password) => {
        return bcrypt.hashSync(password, 10);
    },
    responseGenerator: (res, data, status = 200, message, error) => {
        const response = {}
        response.data = data
        response.status = status
        response.message = message
        response.error = error
        res.status(status).json(response)
    },

    issueJWTtoken: (user) => {
        const _id = user._id;
        const expiresIn = '7d';
        const payload = {
            sub: _id,
            iat: Date.now()
        }

        // Signing the Token using jsonwebtoken 
        /**
         * @package jsonwebtoken
         * @param payload
         * @function sign: (payload, SECRET KEY, tokens options)
         * @returns token, expiresIn
         */
        const signJwtToken = jsonWebToken.sign(payload, process.env.SECRET, { expiresIn: expiresIn });
        return {
            token: "Bearer " + signJwtToken,
            expiresIn: expiresIn
        }
    },
    jwtVerifyer: (token) => {
        return jsonWebToken.verify(token, process.env.SECRET);
    }

}