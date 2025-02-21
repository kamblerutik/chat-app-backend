const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname) )
    }
})

const upload = multer({storage: storage});

const uploadImage = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                status: false,
                message: "file required!"
            })
        }

        const imageUrl = `https://chat-app-backend-asva.onrender.com/api/uploads/${req.file.filename}`
        res.status(200).json({
            status: true,
            imageUrl,
            message: "file uploaded!"
        })

    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {uploadImage, upload}