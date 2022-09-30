import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import morgan from 'morgan'
// import {register, login} from "./controllers/auth.controller.js";
import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import { verify } from "./middleware/verifyToken.js";

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
app.get('/', (req, res)=> res.json({message:"welcome to taxi api"}))

app.use('/auth',authRouter)
// app.post('/register',register)
// app.post('/login', login)
app.use('/api', verify)
app.use('/api/user', userRouter)

mongoose.connect(process.env.URL)
.then(()=>console.log("DB connected"))
.catch((e)=>console.log("error connecting to DB", e))
app.listen(process.env.PORT,()=>{
    console.log(`Api running, port ${process.env.PORT}`)
})