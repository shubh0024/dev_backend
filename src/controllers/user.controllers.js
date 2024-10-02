import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import {User} from '../models/user.models.mjs';

const registerUser = asyncHandler(async (req,res)=>{
  // return res.status(200).json({
  //       message: "User registered successfully"
// })

        const{fullName,email,username,password} = req.body 
        // console.log("email",email);
        // console.log("fullName",fullName);
        // console.log("username",username);
        // console.log("password",password);

        if([fullName,email,username,password].some((fields)=>
            fields?.trim()===""))
        {
            throw new ApiError("All fields are required",400)
        }
 
console.log({fullName,email,username,password})
        //This is for the finding the first field
      const existedUser = await User.findOne({
            $or:[{email},{username}]
        });


        if(existedUser){
            throw new ApiError(409,"User with email or username already exists");
        }

        //console.log(req.files)

       const avatarLocalPAth= req.files?.avatar?.[0]?.path;
       const coverImageLocalPath=req.files?.coverImage?.[0]?.path;

       //if use ? sometime u get error here for upper code like Cannot read properties of undefined
    //    let coverImageLocalPath:
    //    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0{
    //     coverImageLocalPath=req.files.coverImage[0].path;
    //    })

       if(!avatarLocalPAth){
        throw new ApiError("Please upload avatar",400);
        
       }


      const  avatar=await uploadOnCloudinary(avatarLocalPAth)
      const coverImage=await uploadOnCloudinary(coverImageLocalPath);

      if(!avatar){
        throw new ApiError("Failed to upload avatar",400)
      }

     const user=await User.create({
                      fullName,
                      avatar:avatar.url,
                      coverImage:coverImage?.url || "",
                      email,
                      username:username.toLowerCase(),
                      password
      })

         const createUser=  await User.findById(user._id).select(
            "-password -refreshToken" //it not necesary to get the refresh token or password

         )
      if(!createUser){
        throw new ApiError("Failed to create user",500)
      }


      return res.status(201).json(
        new ApiResponse(200,createUser,"User rgistered sucessfully ")
      )



      
    //  return res.json({
    //     message:"User registered successfully",
        // user:createUser,
        // token:createUser.generateToken()
    //   })


})

//get userdetails from frontend 
//validation -not empty
//check user if already registered :user eamil
//check for images ,check for avatar
//upload for cloudinary ,avatar for cloudinary
//create user object -create entry in db

export default registerUser

