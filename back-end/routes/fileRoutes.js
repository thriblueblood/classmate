const express = require("express")
const {protect} = require("../middleware/authMiddleware.js")
const {upload, getAllFiles, download} = require('../controllers/fileControllers.js')
const multer = require('multer');
const router = express.Router()

const storage = multer({
    storage: multer.diskStorage({
      destination(req, file, cb) {
        cb(null, './files');
      },
      filename(req, file, cb) {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
      }
    }),
    limits: {
      fileSize: 1000000 // max file size 1MB = 1000000 bytes
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
        return cb(
          new Error(
            'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
          )
        );
      }
      cb(undefined, true); // continue with upload
    }
  });

router.route("/upload").post(storage.single('file'), upload)
router.route("/getAllFiles/:subjectId").get(protect, getAllFiles)
router.route("/download/:id").get(protect, download)


module.exports = router