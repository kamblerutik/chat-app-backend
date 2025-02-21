require("dotenv").config()
const express = require("express");
const cors = require("cors");
const connectDB = require("./src/db/db");
const app = express()
const port = process.env.PORT

const authRouter = require("./src/routes/auth.routes")
const uploadRouter = require("./src/routes/upload.routes")

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.use("/api/auth", authRouter)
app.use("/api/upload", authRouter)


connectDB().then(() => {
    app.listen(port ,() => {
        console.log(`server is running on port: ${port}`);  
    })
})