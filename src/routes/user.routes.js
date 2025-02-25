const express= require("express");
const router = express.Router()

const userController = require("../controllers/user.controller")

router.route("/get-user-by-id/:id").get(userController.getUserById)
router.route("/get-all-users/").get(userController.getAllUsers)
router.route("/follow-user").post(userController.followUser)
router.route("/unfollow-user").post(userController.unfollowUser)


module.exports = router