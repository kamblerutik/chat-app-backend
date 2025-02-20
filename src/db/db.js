const mongoose = require("mongoose");
const uri = process.env.URL

const connectDB = async() => {
    try {
        await mongoose.connect(uri)
        console.log("Connected to db!");
        
    } catch (error) {
        console.log(error);
        
    }
};

module.exports = connectDB