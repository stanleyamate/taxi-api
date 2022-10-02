import { Router } from "express";
import { getUser, getAllUsers, updateUser, deleteUser } from "../controllers/admin.controller.js";

const router = Router()
router
.route('/')
.get(getAllUsers)

router
.route('/:id')
.get(getUser)
.put(updateUser)
.patch(deleteUser)

export default router;