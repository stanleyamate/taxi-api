import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

//GET a single
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('username firstname lastname isDriver number profilePic valideDoc isDriver balance phone').exec()
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ err, message: { msg: "Error getting user", success: false } })
    }
}

//GET ALL users
export const getAllUsers = async (req, res) => {
     
    if (req.user.isAdmin && req.body.activeUser) {
        try {
            const allUsers = await User.find({isDeleted:false}).select('username firstname lastname isDriver number profilePic valideDoc isDriver balance phone ').exec()
            res.status(200).json(allUsers)
        } catch (err) {
            res.status(500).json({ err, message: { msg: "Error getting users", success: false } })
        }
    } else if(!req.body.activeUser){
        try {
            const allUsers = await User.find({isDeleted:true}).select('username firstname lastname isDriver number profilePic valideDoc isDriver balance phone ').exec()
            res.status(200).json(allUsers)
        } catch (err) {
            res.status(500).json({ err, message: { msg: "Error getting users", success: false } })
        }
    }else{
        res.status(403).json({ message: { msg: "Sorry, Admins Only!", success: false } })
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
            res.status(500).json({ message: { msg: "Sorry, there is a server error!", success: false } })
        }
    } else {
        res.status(403).json({ message: { msg: "Sorry, You can update only your account!", success: false } })
    }
}

//DELETE user
export const deleteUser = async (req, res) => {
    if (req.user.id === req.params.id) {
        try {
            await User.findByIdAndUpdate(req.params.id,{
                ...req.body, isDeleted: true
            }, { new: true })
            res.status(200).json({ message: { msg: "User successfully deleted!", success: true } })
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json({ message: { msg: "Sorry, unable to delete this account!" } })
    }
}


