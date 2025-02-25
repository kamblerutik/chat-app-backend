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


const followUser = async(req, res) => {
    try {
        const {userId, targetUserId} = req.body

        if (userId === targetUserId) {
            return res.status(400).json({ message: "You can't follow yourself" });
        }

        const user = await userModel.findById(userId)
        const targetUser = await userModel.findById(targetUserId)

        if (!user || !targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.following.includes(targetUserId)) {
            user.following.push(targetUserId);
            targetUser.followers.push(userId);
            await user.save();
            await targetUser.save();
            return res.status(200).json({ message: "Followed successfully" });
        } else {
            return res.status(400).json({ message: "Already following this user" });
        }

    } catch (error) {
        console.log(error);
    }
}

const unfollowUser = async(req, res) => {
    try {
        const {userId, targetUserId} = req.body

        const user = await userModel.findById(userId);
        const targetUser = await userModel.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({ message: "User not found" });
        }

        user.following = user.following.filter(id => id.toString() !== targetUserId);
        targetUser.followers = targetUser.followers.filter(id => id.toString() !== userId);

        await user.save();
        await targetUser.save();

        return res.status(200).json({ message: "Unfollowed successfully" });
        
    } catch (error) {
        console.log(error);
        
    }
}


module.exports = {getUserById, getAllUsers, followUser, unfollowUser}