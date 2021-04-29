'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { routeCons } =require('../utils/func').funcUtility;
const { createContent, findContentsByUserIdAndCategoryId, updateContentByContentIdAndPublisherId, deleteContentByContentAndUserId, searchCotent, filterForContent } = require('../controllers/content')

// Add Content Routes
router.post(routeCons.ROUTES_CONSTANTS.CREATE_CONTENT, passport.authenticate('jwt', {session: false}), createContent);

// Find Content Routes
router.get(routeCons.ROUTES_CONSTANTS.FIND_CONTENT, passport.authenticate('jwt', {session: false}), findContentsByUserIdAndCategoryId);

// Upation Of Content Routes
router.put(routeCons.ROUTES_CONSTANTS.UPDATE_CONTENT, passport.authenticate('jwt', {session: false}), updateContentByContentIdAndPublisherId);

// Delete in Error Content
router.delete(routeCons.ROUTES_CONSTANTS.DELETE_CONTENT, passport.authenticate('jwt', {session: false}), deleteContentByContentAndUserId);

// Search Content Rote
router.get(routeCons.ROUTES_CONSTANTS.SEARCH_CONTENT, passport.authenticate('jwt', {session: false}), searchCotent);

// Filter Content Route
router.post(routeCons.ROUTES_CONSTANTS.FILTER_CONTENT, passport.authenticate('jwt', {session: false}), filterForContent);


module.exports = router;