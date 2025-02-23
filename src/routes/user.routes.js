const express= require("express");
const router = express.Router()

const userController = require("../controllers/user.controller")

router.route("/get-user-by-id/:id").get(userController.getUserById)
router.route("/get-all-users/").get(userController.getAllUsers)


module.exports = router