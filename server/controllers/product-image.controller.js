var multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}
}

exports.uploadImg = multer({storage: storage, fileFilter: fileFilter}).single('imageUrl');