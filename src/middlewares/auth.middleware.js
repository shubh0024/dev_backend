import jwt from 'jsonwebtoken';
import { User } from "../models/user.models.mjs";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try{

   const token = req.cookies?.accessToken || req.header 
    ("Authorization")?.replace("Bearer","").trim();
    // console.log(token)

    if(!token){
        throw new ApiError(401,"Unauthorized reqeust")
    }

    const decodeToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    const user = await User.findById(decodeToken?._id).
    select("-password -refreshToken")

    if(!user){
        throw new ApiError(401,"Inavalid Access Token")
    }

    req.user = user;
    next();
    }catch(error){
        throw new ApiError(401,error?.message || "Inavlid process")
      
    }
    // if user is found then move forward to the next middleware or the route handler


}) 

//next id used for the doing move forward
