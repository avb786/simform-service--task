'use strict'

const User = require('../models/user.model');
const { msgCons, responseGenerator, hashPassword, issueJWTtoken, validPassword, jwtVerifyer } = require('../utils/func').funcUtility;

/**
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @function responseGenerator : (res, data, status, Message, error)
 * @function issueJWTtoken: assigns jwt token
 * @function hashPassword : (password)
 * 
 */

// New user register
const register = async (req, res, next) => {
    const email = req.body.email;
    const username = req.body.username;
    if (await User.findOne({ email: email })) {
        return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.EMAIL_EXISTS, true);
    }
    if (await User.findOne({ username: username })) {
        return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.USERNAME_EXISTS, true);
    }

    req.body.encry_password = hashPassword(req.body.password);

    const newUser = new User(req.body);
    newUser.save()
        .then((user) => {
            const jwt = issueJWTtoken(user);
            const finalUserData = {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                profile_image: user.profile_image,
                email: user.email,
                token: jwt.token,
                expiresIn: jwt.expiresIn
            }
            return responseGenerator(res, finalUserData, 200, msgCons.MSG_CONSTANTS.REGISTER_SUCCESS, false);
        }).catch(err => {
            responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.ERROR_REGISTER_SUCCESS, err);
        });
}

// Login 
const login = (req, res, next) => {
    const query = [
        { username: req.body.username },
        { email: req.body.username }
    ]
    User.findOne({ $or: query })
        .then((user) => {
            if (!user) {
                return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.NO_USER_FOUND, true)
            }
            const isValidPassword = validPassword(req.body.password, user.encry_password);
            if (isValidPassword) {
                // JWT Token will get Issue
                const jwt = issueJWTtoken(user);
                const finalUserData = {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    profile_image: user.profile_image,
                    user_id: user.user_id,
                    email: user.email,
                    token: jwt.token,
                    contact: user.contact,
                    expiresIn: jwt.expiresIn
                }
                return responseGenerator(res, finalUserData, 200, msgCons.MSG_CONSTANTS.LOGIN_SUCCESS, false);
            } else {
                return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.WRONG_PASSWORD, true);
            }
        }).catch(err => {
            next(err)
        });
}

// Oauth Login Goole 
const oAuthLoginGoogle = (req, res, next) => {
    User.findOne({ email: req.user._json.email })
        .then(user => {
            // JWT Token will get Issue
            const jwt = issueJWTtoken(user);
            const finalUserData = {
                username: user.username,
                firstname: user.firstname,
                lastname: user.lastname,
                profile_image: user.profile_image,
                email: user.email,
                token: jwt.token,
                expiresIn: jwt.expiresIn
            }
            // responseGenerator(res, finalUserData, 200, msgCons.MSG_CONSTANTS.LOGIN_SUCCESS, false);
            res.redirect(`http://localhost:4200/login?token=${jwt.token.split(' ')[1]}`);
        }).catch(err => {
            return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.ERROR_OAUTH_GOOGLE, true);
        });
}

// Get User Details from Token
const getUserDetailsByToken = async(req, res, next) => {
    const token = req.body.token;
    const userId = await jwtVerifyer(token);
    User.findOne({_id: userId.sub}).then(user => {
        if(!user) {
            return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.ERROR_OAUTH_GOOGLE, true);
        }
        const finalUser = {...user._doc};
        finalUser.token = `Bearer ${token}`;
       return responseGenerator(res, finalUser, 200, msgCons.MSG_CONSTANTS.LOGIN_SUCCESS, false);
    }).catch(err => {
        return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.ERROR_OAUTH_GOOGLE, true);
    })
}


// Uploaded Image using AWS S3 Bucket
const imageUplaoded = (req, res, next) => {
    try {
        if (req.files && req.files.length > 0) {
            const imageData = req.files[0];
            return responseGenerator(res, imageData, 200, msgCons.MSG_CONSTANTS.IMAGE_FETCHED, false);
        }
        return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.NO_IMAGE_FOUND, true);
    } catch (error) {
        return responseGenerator(res, {}, 401, msgCons.MSG_CONSTANTS.NO_IMAGE_FOUND, error);
    }
}

module.exports = {
    register,
    login,
    oAuthLoginGoogle,
    imageUplaoded,
    getUserDetailsByToken
}