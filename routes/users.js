import { Router } from "express";
import { updateUser, getUser, getAllUsers, deleteUser } from "../controllers/user.controller.js";

const router = Router()

//ROUTES
router
.route('/')
.get(getAllUsers)

router
.route('/:id')
.get(getUser)
.put(updateUser)
.delete(deleteUser)

export default router
