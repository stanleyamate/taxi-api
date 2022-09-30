import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
             required:true,
              unique:true
        },
        fullName:{
            type: String,
            required: true
        },
        phone:{
            type: Number,
            required:[true, "pin is required"],
            unique: true
        },
        pin:{
            type: Number,
            min:[4,"min of 4 digits required"],
            default:null
        },
        profilePic: {
            type:String,
            default:""
        },
        password: {
            type:String,
            required:[true, "password required"]
        },
        validDoc:{
            type:String,
            default:""
        },
        isDriver:{
            type:Boolean,
            default:false
        },
        isAdmin:{
            type:Boolean,
            default:false
        }
    },
    {timestamps: true}

);
export const User = mongoose.model('User', UserSchema)
