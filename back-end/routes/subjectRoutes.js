const express = require("express")
const {protect} = require("../middleware/authMiddleware.js")
const {addSubjects, getSubjects} = require('../controllers/subjectControllers.js')

const router = express.Router()

router.route('/').post(protect,addSubjects)
router.route('/:chatId').get(protect,getSubjects)

module.exports = router