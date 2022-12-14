import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

//GET a single
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('username firstname lastname isDriver profilePic isActive').exec()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ err, message: { msg: "Error getting user", success: false } })
    }
}

//GET ALL users
export const getAllUsers = async (req, res) => {

        try {
            //Get all non deleted users
            const allUsers = await User.find({isDeleted: false})
            .select('username firstname lastname isDriver number profilePic isActive isDeleted ').exec()
            res.status(200).json(allUsers)
        } catch (err) {
            res.status(500).json({ err, message: { msg: "Error getting users", success: false } })
        }
}

//UPDATE User
export const updateUser = async (req, res) => {
    if (req.user.id === req.params.id) {
        if (req.body.password) {
            req.body.password = bcrypt.hash(password, 10);
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                ...req.body
            }, { new: true })
            .select('username firstname lastname isDriver number profilePic valideDoc isDriver balance phone')
            res.status(200).json({ updatedUser, message: { msg: "User updated!", success: true } })
        } catch (err) {

            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ err, message: { msg: "Error updating user", success: false } })
    }
}

//DELETE user
export const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            await User.findByIdAndUpdate(req.params.id,{
                ...req.body, isDeleted: true
            }, { new: true })
            res.status(200).json({ message: { msg: "User deleted!", success: true } })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ message: { msg: "Sorry, You can delete only your account!" } })
    }
}


