const express = require('express')
const {registerUser, authUser, allUsers, editUser} = require("../controllers/userControllers.js")
const {protect} = require("../middleware/authMiddleware.js")

const router = express.Router()

router.route("/").post(registerUser).get(protect,allUsers)
router.post("/login",authUser)
router.put("/edit", editUser)

module.exports = router