const express = require("express")
const router = express.Router()
const uploadController = require("../controllers/upload.controller")

router.post('/image', uploadController.upload.single('image'), uploadController.uploadImage);


module.exports = router