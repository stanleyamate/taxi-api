import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
             required:true,
              unique:true
        },
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        phone:{
            type: Number,
            required:[true, "pin is required"],
            unique: [, "phone number has to be unique"]
        },
        pin:{
            type: Number,
            min:[4,"exactly 4 digits required"],
            max:[4,"exactly digits required"],
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
        },
        isActive:{
            type:Boolean,
            default:false
        },
        balance:{
           type: Number,
           default: 0
        },
        isDeleted:{ 
             type:Boolean,
              default:false }
    },
    {timestamps: true}

);
export const User = mongoose.model('User', UserSchema)
