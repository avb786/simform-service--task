const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

/**
 * AWS Config
 * @param secretAccessKey
 * @param accessKeyId
 */
aws.config.update({
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'ap-south-1' 
});

const s3 = new aws.S3();

/* To validate your file type */
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Wrong file type, only upload JPEG and/or PNG !'),
            false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'simform-tasks',
        key: function (req, file, cb) {
            /*I'm using Date.now() to make sure my file has a unique name*/
            req.file = Date.now() + file.originalname;
            cb(null, Date.now() + file.originalname);
        }
    })
});

module.exports = upload;