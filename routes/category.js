'use strict'
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { addCategoryByUser, getAllCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { routeCons } =require('../utils/func').funcUtility;

// Create Category Route
router.post(routeCons.ROUTES_CONSTANTS.CREATE_CATEGORY, passport.authenticate('jwt', {session: false}), addCategoryByUser);

// Get all Category Route
router.get(routeCons.ROUTES_CONSTANTS.GET_ALL_CATEGORY,  passport.authenticate('jwt', {session: false}), getAllCategory);

// Update Category Details Route
router.post(routeCons.ROUTES_CONSTANTS.UPDATE_CATEGORY,  passport.authenticate('jwt', {session: false}), updateCategory);

// Deletion Category Route
router.delete(routeCons.ROUTES_CONSTANTS.DELETE_CATEGORY,  passport.authenticate('jwt', {session: false}), deleteCategory);


module.exports = router;