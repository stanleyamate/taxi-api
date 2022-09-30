import { Router } from "express";
import { register, login, multipleUpload } from "../controllers/auth.controller.js";

const router = Router()

//Register
router
.route('/register', multipleUpload)
.post(register)

router
.route('/login')
.post(login)

export default router
