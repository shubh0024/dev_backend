import { Router } from "express";
import registerUser from "../controllers/user.controllers";

import {upload} from "../middlewares/multer.middleware.js"

// register route
const router= Router()

router.route("/register").post(
    //midleware injecting 
    upload.fields([
        {
            name:'profile',
            maxCount:1
        },
        {
            name:'cover',
            maxCount:1
        }
    ]),
    
    registerUser)

//for login methods 

// router.route("/login").post(loginUser)

export default router


