import { Router } from "express";
import registerUser from "../controllers/user.controllers.js";

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

// router.route("/login").post(loginUser)

export default router


