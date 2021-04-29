
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const contentSchema = new mongoose.Schema({
    content_description: {
        type: String,
        required: true,
    },
    content_img: {
        type: String,
    },
    content_title: {
        type: String,
        required: true
      },
    add_to_favorite: {
        type: Boolean,
        default:false, 
        required: true
    },
    publisher_id: {
        type: String,
        trim: true,
        required: true,
    },
    category_id: {
        type: Number,
        required: true
    },
    category_type: {
        type: String,
    },
    content_id: {
        type: Number
    },
    ratings: {
        type: Number,
        default: 0,
        required: true
    },
    content_lang: {
        type:String,
        required: true
    },
    content_level: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

contentSchema.index({content_title: 'text', content_description: 'text'})
contentSchema.plugin(AutoIncrement, {inc_field: 'content_id'});

module.exports = mongoose.model("Content", contentSchema);

/**
 * content_level: {
 * 0: Begginer,
 * 1: Intermediate,
 * 2: Difficult
 * }
 */
