import { asyncHandler } from "../utils/asyncHandler";

const registerUser = asyncHandler(async (req,res)=>{
  return res.status(200).json({
        message: "User registered successfully"
})
})

//get userdetails from frontend 
//validation -not empty
//check user if already registered :user eamil
//check for images ,check for avatar
//upload for cloudinary ,avatar for cloudinary
//create user object -create entry in db

export { registerUser}

