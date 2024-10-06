import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import {User} from '../models/user.models.mjs';



const generateAccessandRefreshTokens= async(userId)=>{
  try{

    // console.log(user);

   const user= await User.findById(userId)
   const accessToken= user.generateAccessToken()
  const refreshToken=user.generateRefreshToken() //add it to db

  user.refreshToken = refreshToken;
  user.save({validateBeforeSave:false})
  //  await user.save()
  return {accessToken,refreshToken}


  }catch(error){
    throw new ApiError(500,"Error fetching",500)
  }
}

//get userdetails from frontend 
//validation -not empty
//check user if already registered :user eamil
//check for images ,check for avatar
//upload for cloudinary ,avatar for cloudinarynpm run dev
//create user object -create entry in db
const registerUser = asyncHandler(async(req,res)=>{
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
                      avatar:avatar, //not necessary to pass the url of the image
                      coverImage:coverImage?.url || "",
                      email,
                      username:username.toLowerCase(),
                      password
      })

         const createUser=  await User.findById(user._id).
         select(
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


const loginUser = asyncHandler(async(req,res)=>{
 //req body ->data
  //require email and password
 //checks if email and psswrd input correctly
 //check for login credentials
 //if credentials are correct generate token
 //if not throw error
//send cookies

const {email ,username,password} = req.body

console.log(req.body)
// if(!username || !password)

if (!password || (!email && !username)) {
  return res.status(400).json({ message: 'Email/Username and password are required' });
}

// if(!(email && username)){
//   throw new ApiError("Please provide email and username ",400)
 

//find the user by email and password
const user=await User.findOne({
  $or:[{email},{username}]
})

if(!user){
  throw new ApiError("User not found",401);
}

const isValidPassword = await user.isPasswordValid(password);

if(!isValidPassword){
  throw new  ApiError(401,"Inavlid user credentials ")
}

const {accessToken,refreshToken} = await generateAccessandRefreshTokens(user._id)

const loggedinUser =await  User.findById(user._id).
select("-password -refreshToken");

const userResponse = {
  _id: loggedinUser._id,
  fullName: loggedinUser.fullName,
  email: loggedinUser.email,
  username: loggedinUser.username,
  avatar: loggedinUser.avatar,
  coverImage: loggedinUser.coverImage
};

const options = {
  httpOnly:true,
  secure:true
}

return res
.status(200)
.cookie("accessToken",accessToken,options)
.cookie("refreshToken",refreshToken,options)
.json(
  new ApiResponse(
    200,
    {
      user:userResponse,accessToken
      // message:"User logged in successfully"
    },
    "User logged in successfully"
  )
)
})

//now logout fuction declared

const logoutUser = asyncHandler(async(req,res)=>{
  await User.findByIdAndUpdate(
    req.user._id,{
      $set:{refreshToken:undefined}
    },
    {
      new:true //u can take new value inplace of existed val
    }
  )

  const options = { 
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true
  }

  //coookies clear the cache
  return res
 .status(200)
 .clearCookie("accessToken",options)
 .clearCookie("refreshToken",options)
 .json(
    new ApiResponse(
      200,
      {},
      "User logged out successfully"
    )
  )
})

//acessToken is the token that helps user to access wihtout need of email and login again and again but  to refresh
//refreshToken is the token that stored in the library which is used to refresh

const refreshAccessToken = asyncHandler(async(req,res)=>{
  const incomingrefreshToken =req.cookies.refreshToken || req.body.refreshToken
  console.log(incomingrefreshToken)
  if(!incomingrefreshToken){
    throw new ApiError(401,"unauthorized request")
  }

  try {
    const decodeToken = jwt.verify(
      incomingrefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    )
  
    const user = await User.findById(decodeToken?._id)
  
    if(!user){
      throw new ApiError(401,"Invalid refresh token")
    }
    if(incomingrefreshToken!== user.refreshToken){
      throw new ApiError(401,"Invalid refresh token")
    }
  
    const options={
      httpOnly:true,
      secure:true
    }
    const {accessToken,newRefreshToken} = await generateAccessandRefreshTokens(user._id)
  
  
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("accessToken",newRefreshToken,options)
    .json(
      new ApiResponse(
        200,
        {accessToken,refreshToken:newRefreshToken},
        "User refreshed successfully"
      )
    )
  } catch (error) {
    throw new ApiError(401,error?.message ||
      "Invalid refresh token")
  }
})

//change the password 
const  changeCurrentPassword = asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body

    const user=await User.findById(req.user?._id)
    const isPasswordCorrect = await user
     isPasswordCorrect(oldPassword)

     if(!isPasswordCorrect){
      throw new ApiError(400,"Inavalid old password")
     }

     user.password = newPassowrd

     await user.save({validateBeforeSave:true})

     return res.
     status(200)
     .json(new ApirResponse200,{},"Password changer successfully")
})

const getCurrentUser = asyncHandler(async(req,res)=>{
  return res
  .status(200)
  .json(200,req.user,"current user fetched successfully")
})

const updateAccountDetails = asyncHandler(async(req,res)=>{
  const {fullName,email,username}=req.body
 
  if(!fullName || !email || !username){
    throw new ApiError(400,"All fields required")
  }
 const user =await User.findByIdAndUpdate(
    req.user?._id,
    {
  $set:{
    fullName,
    email:email
  }
    },
    {new :true}

  ).select("-password")

  return res
  .status(200)
  .json(new ApiResponse(200,user,"Account details updated successfully"))
})


//for the file upload usse the multer

const updateUserAvatar = asyncHandler(async (req, res) => {

const avatarLocalPath = req.file?.path

if(!avatarLocalPath){
  throw new ApiError("Please upload avatar",400);
}

const avatar= await uploadOnCloudinary(avatarLocalPath)

if(!avatar.url){
  throw new ApiError("Failed to upload avatar",400)
}

const user = await User.findByIdAndUpdate(
  req.user?.id,{
    $set:{avatar=avatar.url}
  },{
    new:true
  }
).select("-passoword")

return res
.status(200)
.json(
  new ApiResponse(
    200,
    user,
    "User avatar updated successfully"
  )
)
})


const updateUserCoverImage = asyncHandler(async (req, res) => {

  const CoverImagePath = req.file?.path
  
  if(!CoverImagePath){
    throw new ApiError("Please upload CoverImage",400);
  }
  
  const coverImage= await uploadOnCloudinary(CoverImagePath)
  
  if(!coverImage.url){
    throw new ApiError("Failed to upload CoverImage",400)
  }
  
  const user =await User.findByIdAndUpdate(
    req.user?.id,{
      $set:{coverImage=coverImage.url}
    },{
      new:true
    }
  ).select("-passoword")
  

  return res
  .status(200)
  .json(new ApiResponse(
    200,
    user,
    "user coverImage uploaded succesfully"))
  

  })


export {
   registerUser,
   loginUser,
   logoutUser,
   refreshAccessToken,
   changeCurrentPassword,
   getCurrentUser,
   updateAccountDetails,
   updateUserAvatar,
   updateUserCoverImage
}

