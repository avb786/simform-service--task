'user strict'
const Content = require('../models/content.model');
const { msgCons, responseGenerator } = require('../utils/func').funcUtility;

/**
 * 
 * @param {
 * content_description,
 * content_img,
 * content_title,
 * publisher_id (userId),
 * category_id,
 * category_type,
 * ratings,
 * content_lang,
 * content_level,
 * content_id
 * } req.body
 * @param {*} res 
 * @param {*} next 
 */

// Create New Content
const createContent = (req, res, next) => {
    const contentBody = req.body;
    const newContent = new Content(contentBody);
    newContent.save().
        then(content => {
            return responseGenerator(res, content, 200, msgCons.MSG_CONSTANTS.CONTENT_ADDED, false);
        }).catch(err => {
            return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.ERROR_ADD_CONTENT, err);
        });
}

// Find Contet by UserId and Category Id
const findContentsByUserIdAndCategoryId = (req, res, next) => {
    const userId = req.params.userId;
    const categorId = req.params.categoryId;
    Content.find({ publisher_id: userId, category_id: Number(categorId) }).sort({ content_id: -1 }).then(contents => {
        if (!contents || contents.length === 0) {
            return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.CONTENT_NOT_FOUND, true);
        }
        return responseGenerator(res, contents, 200, msgCons.MSG_CONSTANTS.CONTENT_FOUND, false);
    }).catch(err => {
        return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.ERROR_CONTENT_FOUND, true);
    })
}


// Update Content by Content Id and Publisher Id
const updateContentByContentIdAndPublisherId = (req, res, next) => {
    const userId = req.body.userId;
    const contentId = req.body.content_id;
    const updatedContentBody = req.body.update_content;
    console.log(updatedContentBody);
    Content.updateOne({ publisher_id: userId, content_id: Number(contentId) }, { $set: { updatedContentBody } }).then(contents => {
        if (!contents || contents.length === 0) {
            return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.CONTENT_NOT_FOUND, true);
        }
        return responseGenerator(res, contents, 200, msgCons.MSG_CONSTANTS.CONTENT_UPDATED, false);
    }).catch(err => {
        return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.ERROR_CONTENT_UPDATED, true);
    })
}

//Delete Content by Content Id, and user Id
const deleteContentByContentAndUserId = (req, res, next) => {
    const userId = req.body.userId;
    const contentId = req.body.content_id;
    Content.deleteOne({ publisher_id: userId, content_id: Number(contentId) }).
        then(content => {
            if (!content) {
                return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.CONTENT_NOT_FOUND, true);
            }
            return responseGenerator(res, content, 200, msgCons.MSG_CONSTANTS.DELETE_CONTENT, false);
        }).catch(err => {
            return responseGenerator(res, {}, 400, msgCons.MSG_CONSTANTS.ERROR_DELETE_CONTENT, err);
        });
}


// Search Text for Context
const searchCotent = async(req, res, next) => {
    //Create Index to search text
    const searchText = req.query['search'];
    const userId = req.query['userId'];
    Content.find({ $text: { $search: searchText },publisher_id: userId}).sort({ content_id: -1 }).then(async(searchContent) => {
        if (!searchContent || searchContent.length === 0) {
            return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.CONTENT_NOT_FOUND, true);
        }
        return responseGenerator(res, searchContent, 200, msgCons.MSG_CONSTANTS.CONTENT_FOUND, false);
    }).catch(err => {
        return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.CONTENT_NOT_FOUND, err);
    })
}

/**
 * @function filterForContent :
 * Filter Be done on the basis of
 * 1) ratings
 * 2) content_lang
 * 3) content_level
 */

const filterForContent = (req, res, next) => {
    const filterData = req.body.filter;
    Content.find(filterData).then(filter => {
        if (!filter || filter.length === 0) {
            return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.CONTENT_NOT_FOUND, true);
        }
        return responseGenerator(res, filter, 200, msgCons.MSG_CONSTANTS.CONTENT_FOUND, false);
    }).catch(err => {
        return responseGenerator(res, {}, 404, msgCons.MSG_CONSTANTS.CONTENT_NOT_FOUND, err);
    });
}

module.exports = {
    createContent,
    findContentsByUserIdAndCategoryId,
    updateContentByContentIdAndPublisherId,
    deleteContentByContentAndUserId,
    searchCotent,
    filterForContent
}