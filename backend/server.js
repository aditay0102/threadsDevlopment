import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import router from './routes/userRoutes.js'


// HKoNSnNlI8T8yqk4


dotenv.config()
connectDB();
const PORT = process.env.PORT || 3000
const app = express();
app.use(express.json()); // middleware for parsing json in request body
app.use(express.urlencoded({extended: true})); // To parse from data in the req.body
app.use(cookieParser());




// Rutes 
app.use("/api/user",router);


app.listen(5555,()=>{ console.log(`live server at ${PORT}`)});

