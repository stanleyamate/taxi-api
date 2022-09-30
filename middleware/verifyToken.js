import jwt from "jsonwebtoken";

export const verify = (req, res, next)=>{
    const config = process.env
    const authHeader= req.headers.authorization
    if(authHeader){
        try {
            const token = authHeader.split(" ")[1]
            const decoded =jwt.verify(token, config.SECRET_KEY)
            req.user =decoded
            next()
    } catch (error) {
         res.status(403).json("Token is not valid")
         }
    }
    else{
        return res.status(401).json("You are not authenticated")
    }
}