const router = require("express").Router();
const Controller = require("../controllers");
const multer = require("multer")
const path = require("path");
const fs= require("fs")
//const storage = multer.memoryStorage()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let paths = path.resolve(__dirname, '../../public');
         fs.mkdirSync(paths, { recursive: true })
        cb(null, paths)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + `.${file.originalname.split('.').pop()}`)
    }
  });
const upload = multer({ storage: storage })
router.post("/login", Controller.Customer.login);
router.post("/register", Controller.Customer.register);
router.post("/uploadFile",upload.single("upload"),Controller.Customer.upload)
module.exports = router;