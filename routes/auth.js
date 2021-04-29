'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { register, login, oAuthLoginGoogle, imageUplaoded, getUserDetailsByToken } = require('../controllers/auth');
const { routeCons } = require('../utils/func').funcUtility;
const uplaod = require('../middleware/awsUpload');

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.send('Thanks for checking, Auth Done')
})

// Login route
router.post(routeCons.ROUTES_CONSTANTS.LOGIN_URL, login);

// Registration Route
router.post(routeCons.ROUTES_CONSTANTS.REGISTER_URL, register);

// OAuth 2.0 Google Login Route
router.get(routeCons.ROUTES_CONSTANTS.GOOGLE_OAUTH_LOGIN, passport.authenticate('google', { scope: ['profile', 'email'] }));

// Oauth Google Callback Route
router.get(routeCons.ROUTES_CONSTANTS.GOOGLE_OAUTH_CALLBACK, passport.authenticate('google', { failureRedirect: 'http://localhost:4200/login' }), oAuthLoginGoogle);

// Where image is the name of the property sent from angular via the Form Data and the 1 is the max number of files to upload.
router.post(routeCons.ROUTES_CONSTANTS.UPLOAD_IMAGE, uplaod.array('image', 1), imageUplaoded);

// Get User By Token Route
router.post(routeCons.ROUTES_CONSTANTS.GET_USER_TOKEN, getUserDetailsByToken);


module.exports = router;