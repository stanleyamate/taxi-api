import { Router } from "express";
import { updateUser, getUser, getAllUsers } from "../controllers/user.controller.js";

const router = Router()

//ROUTES
router
.route('/')
.get(getAllUsers)

router
.route('/:id')
.get(getUser)
.put(updateUser)

export default router
