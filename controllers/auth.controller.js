import {User} from '../models/User.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';

//Register
export const register = async (req, res) =>{
  var encryptedPassword
  const {username, fullName, phone, pin, profilePic,password,  isAdmin, isDriver, valideDoc} = req.body
  try {
    const oldUser = await User.findOne({phone})
    if(oldUser){
      res.status(209).json({message:{ msg:"User already exist", success:false}})
    }
  } catch (err) {
    res.status(500).json({err, message:{ msg:"Internal Error", success:false}})
  }
  try {
    encryptedPassword = await bcrypt.hash(pin, 10);

    const newUser = new User({
      username,
      fullName,
      phone,
      pin,
      password:encryptedPassword,
      profilePic,
      valideDoc,
      isAdmin,
      isDriver
    })
      const user = await newUser.save()
      res.status(201).json({user, message:{ msg:"Registration successful", success:true}})
  } catch (err) {
      res.status(500).json({err, message:{ msg:"Error Registrating", success:false}})
  }
}

//Login

export const login = async (req, res) =>{

  const {phone, password, pin} = req.body
  
  try {
    if (!(phone && password) || !(phone && pin)) {
      return res.status(400).json({message:{msg:"All inputs required",success: false}});
    }
    const registeredUser = await User.findOne({phone}).exec()
    if(!registeredUser){
      res.status(404).json({message:{msg:"User not found", success:false}})
    }
  } catch (err) {
    res.status(500).json({message:{msg:"Error finding User", success: false}})
  }
  try {
    const user = await User.findOne({ phone }).exec()
    if(user && (await bcrypt.compare(password, user.password))){
      const accessToken= jwt.sign({id:user._id, isAdmin:user.isAdmin}, process.env.SECRET_KEY, {expiresIn:"1d"})
     const { password,updatedAt,__v, ...userInfo } = user._doc
     return res.status(200).json({...userInfo, accessToken, message:{msg:"Login succesful", success:true}})
    }
    else{
     return res.status(401).json({message:{msg:"Invalid credentials", success:false}})
    }
  } catch (error) {
   return res.status(500).json({message:{msg:"Error Logging", success: false}})
  }
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads')
  }, filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({ storage: storage })
export const multipleUpload = upload
// .fields([{name:'profilePic', maxCount:1}, {name:'validDoc', maxCount:5}])
 



