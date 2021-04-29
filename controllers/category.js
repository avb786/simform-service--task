  
const Category = require('../models/category.model'); // Sequelize model 
const { msgCons, responseGenerator} = require('../utils/func').funcUtility;

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @function addCategoryByUser : Adding of Category for particular User
 */
const addCategoryByUser = (req, res, next) => {
    const userId = req.body.userId;
    const categoryName = req.body.categoryName;
    const description = req.body.description;
    const type = req.body.type;

    // Create Category using SQL ORM Sequlize
    Category.create({
        categoryName: categoryName,
        type: type,
        description, description,
        userId: userId
    }).then(category => {
        return responseGenerator(res, category, 200, msgCons.MSG_CONSTANTS.CATEGORY_ADDED, false);
    }).catch(err => {
        return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.ERROR_CATEGORY_ADDED, err);
    })
}


// Get All Category of Particular User
const getAllCategory = (req, res, next) => {
const userId = req.params.userId;
Category.findAll({ where: { userId: userId } }).then(category => {
    if(!category || category.length === 0) {
        return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.CATEGORY_NOT_FOUND, true)
    } 
    return responseGenerator(res, category, 200, msgCons.MSG_CONSTANTS.CATEGORY_FETCHED, false);
}).catch(err => {
    return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.ERROR_FOUND_CATEGORY, err)
})
}

// Update of Category 
/**
 * 
 * @param userId 
 * @param query
 *  
 */
const updateCategory = (req, res, next) => {
    const userId = req.body.userId;
    const categoryId = req.body.categoryId;
    const query = req.body.query;
    Category.update(query, { where: {userId: userId, id: categoryId} }).then(updatedCategoryDetails => {
        if(!updatedCategoryDetails || updatedCategoryDetails.length === 0) {
            return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.CATEGORY_NOT_FOUND, true)
        } 
        return responseGenerator(res, updatedCategoryDetails, 200, msgCons.MSG_CONSTANTS.UPDATE_CATEGORY, false)
    }).catch(err => {
        return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.ERROR_UPDATE_CATEGORY, err)
    })
}

// Delete Category
const deleteCategory = (req, res, next) => {
    const userId = req.params.userId;
    const categoryId = req.params.categoryId;
    console.log('USER',  userId);
    Category.destroy({where: {userId: userId, id: categoryId}}).then(category => {
        if(!category || category.length === 0) {
            return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.CATEGORY_NOT_FOUND, true);
        }
        return responseGenerator(res, category, 200, msgCons.MSG_CONSTANTS.CATEGORY_DELETED, false);
    }).catch(err => {
        return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.ERROR_DELETE_CATEGORY, err);
    })
}

module.exports = {
    addCategoryByUser,
    getAllCategory,
    updateCategory,
    deleteCategory
}