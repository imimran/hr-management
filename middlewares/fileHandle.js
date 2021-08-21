const multer = require('multer');
const path = require('path')


//configuring multer storage for images
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      

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

//Filtering csv  file 
const csvFilter = (req, file, cb) => {
    if (file.mimetype.includes("csv")) {
      cb(null, true);
    } else {
      cb("Please upload only csv file.", false);
    }
  };



const upload = multer({
    storage: fileStorage,
    fileFilter: csvFilter,
    // limits: { fileSize: 10000000 } 
});



const formOnly = multer();


const uploadFile = upload.single('file');

const form = formOnly.none();



module.exports = {  uploadFile, form }