import { Router } from "express"
import { registerUser, loginUser, logoutUser,refreshAccessToken} from "../controllers/user.controllers.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

// register route
const router= Router()

// router.get('/register',(req,res)=>{
//     res.json([{id:1,name:'john doe',email:'john@example.com'}]);
// })

router.route('/register').post(
   // midleware injecting 
    upload.fields([
        {
            name:'avatar',
            maxCount:1
        },
        {
            name:'coverImage',
            maxCount:1
        }
    ]),
    
   registerUser)

//for login methods 

router.route("/login").post(loginUser)


//secure routes 
router.route("/logout").post(verifyJWT,logoutUser)

//refreshToken the token when session get expired by user 
//we didnt uses the verifyJwt already handled in the decodedToeken method
router.route("/refresh-token").post(refreshAccessToken)

export default router


