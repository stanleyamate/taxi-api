import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

//UPDATE
export const updateUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = bcrypt.hash(password, 10);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, { new: true }).select('username email profilePic isDriver')
            res.status(200).json({ updatedUser, message: { msg: "User updated!", success: true } })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ message: { msg: "Sorry, You can update only your account!", success: false } })
    }
}
//DELETE
export const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({ message: { msg: "User deleted!", success: true } })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ message: { msg: "Sorry, You can delete only your account!" } })
    }
}

//GET
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('username email profilePic isDriver').exec()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ err, message: { msg: "Error getting user", success: false } })
    }
}

//GET ALL
export const getAllUsers = async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const allUsers = await User.find().select('username isDriver number profilePic').exec()
            res.status(200).json(allUsers)
        } catch (err) {
            res.status(500).json({ err, message: { msg: "Error getting users", success: false } })
        }
    } else {
        res.status(403).json({ message: { msg: "Sorry, Admins Only!", success: false } })
    }
}


