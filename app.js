import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import morgan from 'morgan'
// import {register, login} from "./controllers/auth.controller.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import adminRouter from "./routes/admin.js";
import { verify } from "./middleware/verifyToken.js";
import { upload } from "./controllers/user.controller.js";

const app = express()
config()

app.use(express.json())

app.use(
    morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  }))
app.get('/', (req, res)=> res.json({message:"welcome to yellow taxi api"}))


// app.post('/register',register)
// app.post('/login', login)
app.use('/auth',authRouter)
app.use('/api', verify)

app.post('/api/upload-files', upload.array('multi-files'),(req, res)=> res.json({
  message:"upload files",
  mediaFiles: req
}))

app.use('/api/users', userRouter)
app.use('/api/admin/', adminRouter)

mongoose.connect(process.env.URL)
.then(()=>console.log("DB connected"))
.catch((e)=>console.log("error connecting to DB", e))
app.listen(process.env.PORT,()=>{
    console.log(`Api running, port ${process.env.PORT}`)
})