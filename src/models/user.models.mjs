import mongoose from 'mongoose'
import pkg from 'bcrypt';
const {bcrypt} = pkg;

import jwt from 'jsonwebtoken'; // bearer token

const { Schema } = mongoose;

/* JWT is a compact, URL-safe token used to securely transmit information between two parties. 
   It is commonly used for stateless authentication in web applications. 
   A JWT contains three parts:
   Header: Contains the type of token (JWT) and the signing algorithm (e.g., HMAC, RSA).
   Payload: Contains the claims or data (like user info, permissions).
   Signature: Ensures the token’s integrity by combining the header, payload, and a secret key.
*/ 

const userSchema = new Schema({
   username: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true,
       index: true,
   },
   email: {
       type: String,
       required: true,
       unique: true,
       lowercase: true,
       trim: true,
       index: true,
   },
   fullName: {
       type: String,
       required: true,
       trim: true,
       index: true,
   },
   avatar: {
       type: String, // Cloudinary URL
    //    required:true
   },
   coverImage: {
       type: String,
   },
   watchHistory: [
       {
           type: Schema.Types.ObjectId,
           ref: "Video",
       }
   ],
   password: {
       type: String,
       required: [true, 'password is required'],
   },
   refreshToken: {
       type: String,
   },
}, {
    timestamps: true // Corrected here
});

// Pre-save hook to hash the password
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    this.password = await pkg.hash(this.password, 10);
    next();
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Method to generate access token
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName,
        },
        process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};
 const User = mongoose.model('User', userSchema);

export {User};