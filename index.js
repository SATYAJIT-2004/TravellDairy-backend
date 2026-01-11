import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/user.route.js"
import travelStoryRoutes from "./routes/travelStory.route.js"
import path from "path"
import { fileURLToPath } from "url";
import cors from "cors"

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
.then(
    ()=>{
        console.log("Database is connected")
    })
    .catch((err)=>{
        console.log(err)
    })
const app = express()

//Enable cors for frontend (replace with frontend url)
app.use(cors({
    origin:process.env.FRONTEND_URL,//Frontend URL
    methods : ["GET","POST","PUT","DELETE"], //Allowed CRUD Operation
    credentials: true, //Allows cookies and Authorization headers
}))
app.use(cookieParser())

app.use(express.json())

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("Server is running on port: ${PORT}")
})

app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/travel-story",travelStoryRoutes)

//Serve static files from the uploads and assets directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads",express.static(path.join(__dirname,"uploads")))
app.use("/assets",express.static(path.join(__dirname,"assets")))

//Error handling
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500


    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    })
})