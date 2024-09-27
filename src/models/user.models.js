import mongoose, { Schema } from "mongoose";

import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken"; //wearer token
/*JWT is a compact, URL-safe token used to securely transmit information between two parties. It is commonly used for stateless authentication in web applications. A JWT contains three parts:

Header: Contains the type of token (JWT) and the signing algorithm (e.g., HMAC, RSA).
Payload: Contains the claims or data (like user info, permissions).
Signature: Ensures the token’s integrity by combining the header, payload, and a secret key.*/ 

const userSchemas=new Schema({
   username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,
   },
   email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true,

   },
   fullname:{
    type:String,
    required:true,
    trim:true,
    index:true,
   },
   avatar:{
    type:String, //cloudanary url
    required:true,
   
   },
   coverImage:{
    type:String,
   },
   watchHistory:[
    {
    type:Schemas.Types.ObjectId,
    ref:"Video"
   }
],
password:{
    type:String,
    required:[true,'password is required']

},
refreshToken:{
    type:String,
}
},
{
    timeStamps:true
}

)

//we write here async bcz these function take time 
userSchemas.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchemas.method.isPasswordCorrect=async function(password) {
return await bcrypt.compare(password,this.password)

}


userSchemas.methods.generateAccessToken = function(){
   return jwt.sign (
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname,

        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchemas.methods.generateRefreshToken= function(){
      return jwt.sign (
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,

    },
    process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)}








export const User=mongoose.model('User',userSchemas);