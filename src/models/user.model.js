const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileUrl: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    following: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user" 
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user"
    }],
}, {
    timestamps: true
})

const userModel = mongoose.model("user", userSchema);

module.exports = userModel