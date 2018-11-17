const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const date = moment().format('DDMMYYYY_HHmmss_SSS');
        cb(null, `${date}-${file.originalname}`);
    }
});

function fileFilter (req, file, cb) {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype ==='image/gif') {
        cb(null, true);
    }else{
        cb(null, false);
    }
}

limits = {
    fileSize: 1024 * 1024 * 5
};


module.exports = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: limits
});