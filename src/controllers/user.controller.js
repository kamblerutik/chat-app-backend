const userModel = require("../models/user.model");


const getUserById = async(req, res) => {
    try {
        const { id } = req.params

        const user = await userModel.findById(id).select("-password")

        if (user) {
            res.status(200).json({
                status: true,
                message: "user founded",
                user
            })
        }else {
            res.status(404).json({
                status: false,
                message: "user not found",
                user
            })
        }

    } catch (error) {
        console.log(error);
        
    }
}

const getAllUsers = async(req, res) => {
    try {
        const user = await userModel.find().select("-password")

        if (user) {
            res.status(200).json({
                status: true,
                message: "user founded",
                user
            })
        }else {
            res.status(404).json({
                status: false,
                message: "user not found",
                user
            })
        }

    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {getUserById, getAllUsers}