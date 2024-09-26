import { Router } from "express";
import registerUser from "../controllers/user.controllers";

const router= Router()

router.route("/register").post(registerUser)

//for login methods 

// router.route("/login").post(loginUser)

export default router


