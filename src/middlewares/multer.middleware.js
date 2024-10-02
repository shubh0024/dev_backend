import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //   cb(null, file.fieldname + '-' + uniqueSuffix)
    cb(null, file.originalname)  // filename will be the same as original name of file uploaded by user
    }
  });

  
const upload = multer({ storage });
// .single(fileField);

export { upload };  // Named export for 'upload'


