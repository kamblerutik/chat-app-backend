const express = require("express")
const router = express.Router();

const authController = require("../controllers/auth.controller")

router.route("/").get((req, res) => {
    res.send("This home route")
})

router.route("/register").post(authController.register)
router.route("/login").post(authController.login)

module.exports = router