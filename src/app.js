import express from "express"

import cors from "cor"
import cookieParser from "cookie-parser" //it can be used for the cookie parsing logic and where server will start responding with cookies

const app = express();

app.use(cors({
    origin: "process.env.CORS_ORIGIN", // replace with your frontend URL
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}))
 app.use(express.json({limit:"16kb"}))

 app.use(express.urlencoded({extended:true,limit:"16kb"})) // extended 

 app.use(express.static("public")) // serve static public for the whole pdf png 
app.use(cookieParser());
 
export {app}


//(err,res,resp, next) 