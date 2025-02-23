const express= require("express");
const router = express.Router()

const userController = require("../controllers/user.controller")

router.route("/get-user-by-id/:id").get(userController.getUserById)


module.exports = router