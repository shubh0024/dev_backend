import { asyncHandler } from "../utils/asyncHandler";

export const verifyJWT = asyncHandler(async(req,_,next)=>{
    try{
    req.cookies?.acessToken || req.header 
    ("Authorization")?.replace("Bearer","")

    if(!token){
        throw new Error(401,"Unauthorized reqeust")
    }

    Jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    await User.findById(decodedToken?._id).
    select("-password -refreshToken")

    if(!user){
        throw new Error(401,"Inavalid Access Token")
    }

    req.user = user;
    next();
    }catch(error){
        throw new Error(401,error?.message || "Inavlid process")
      
    }
    // if user is found then move forward to the next middleware or the route handler


}) 

//next id used for the doing move forward
