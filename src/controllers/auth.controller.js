const { generateToken } = require("../Authentication/Token");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const avatar = `https://avatar.iran.liara.run/public/boy?username=${username}`


        const isUsernameTaken = await userModel.findOne({ username });
        if (isUsernameTaken) {
            return res.status(400).json({
                status: false,
                message: "username is already taken!",
            });
        }


        const isEmailTaken = await userModel.findOne({ email });
        if (isEmailTaken) {
            return res.status(400).json({
                status: false,
                message: "email is already taken!",
            });
        }

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt)


        const user = await userModel.create({
            username,
            email,
            password: hashedPassword,
            profileUrl: avatar
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

        const checkPassword = bcrypt.compare(password, user.password)

        if (checkPassword) {
            const token = generateToken({id: user._id})
            res.status(200).json({
                status: true,
                token,
                message: "logged in",
            })
        }

    } catch (error) {
        console.log(error);
        
    }
}

module.exports = { register, login };