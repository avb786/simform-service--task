
var mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    username: {
        type: String,
        maxlength: 32,
        trim: true,
        unique: true
    },
    profile_image: {
        type: String
      },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    contact: {
        type: String,
        trim: true,
        unique: true
    },
    gender: {
        type: String,
        trim: true,
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
    },
    role: {
        type: String,
        default: 'USER'
    },
    user_id: {
        type: Number
    },
    email_verified: {
        type: Boolean,
        default: false
    },
    oauth_provider: {
        type: String,
        default: 'regular'
    }
}, { timestamps: true });

userSchema.plugin(AutoIncrement, {inc_field: 'user_id'});

module.exports = mongoose.model("User", userSchema);
