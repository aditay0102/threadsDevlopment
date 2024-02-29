import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const protectRoute = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt;

        if(!token) return res.status(401).json({message: "Unauthorized"});

        const decoded = jwt.verify(token,process.env.JWT_SCRET);

        const user = await User.findById(decoded.userId);
        req.user = user;

        next();
    }
    catch(error){
        console.log({message: error.message})
    }
}

export default protectRoute;