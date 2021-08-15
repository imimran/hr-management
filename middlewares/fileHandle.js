const multer = require('multer');
const path = require('path')


//configuring multer storage for images
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // cb(null, new Date().toISOString().replace(/:/g, '-')
        //     + '-' + file.originalname);

        //Imprtent File.jpg => importent-file-5476585.jpg
        const fileExt = path.extname(file.originalname)  //remove extntion
        const fileName = file.originalname
            .replace(fileExt, "")
            .toLowerCase()
            .split(' ')
            .join('-') + "-" + Date.now()
        cb(null, fileName + fileExt)

    }
});

//Filtering images for every file Field
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/x-icon' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        // cb(null, false);
        cb(new Error("Only .jpg, .png, .jpeg, x-icon or .gif formet allowed !"));
    }
};



const upload = multer({
    storage: fileStorage,
    fileFilter: fileFilter,
    limits: { fileSize: 1000000 } //1 MB //count as a byte
});

const formOnly = multer();

const multipleFile = upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'gallery', maxCount: 3 },
]);


const uploadFile = upload.single('image');
const uploadAvatar = upload.single('avatar');
const multiFileUploader = upload.array('avatar', 3)
const uploadCoverPhoto = upload.single('cover_photo');
const form = formOnly.none();

//Multer Error Handle

// app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'));
module.exports = { multipleFile, multiFileUploader, uploadAvatar, uploadFile, uploadCoverPhoto, form }