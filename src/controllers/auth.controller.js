const userModel = require("../models/user.model");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if username is already taken
        const isUsernameTaken = await userModel.findOne({ username });
        if (isUsernameTaken) {
            return res.status(400).json({
                status: false,
                message: "username is already taken!",
            });
        }

        // Check if email is already taken
        const isEmailTaken = await userModel.findOne({ email });
        if (isEmailTaken) {
            return res.status(400).json({
                status: false,
                message: "email is already taken!",
            });
        }

        // Create a new user
        const user = await userModel.create({
            username,
            email,
            password
        });

        if (user) {
            return res.status(200).json({
                status: true,
                message: "user registered successfully!",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: false,
            message: "Internal server error",
        });
    }
};

const login = async(req, res) => {
    try {
        const {username, password} = req.body

        const user = await userModel.findOne({username})

        if (!user) {
            res.status(400).json({
                status: false,
                message: "user not found!"
            })
        }

        if (user.password === password) {
            res.status(200).json({
                status: true,
                message: "user logged in!"
            })
        }else {
            res.status(400).json({
                status: false,
                message: "invalid credentials!"
            })
        }

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { register, login };