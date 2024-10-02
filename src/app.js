import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser" //it can be used for the cookie parsing logic and where server will start responding with cookies
import Userouter from "./routes/user.router.js";

const app = express();

// app.get('/', (req, res) => {
//     res.send('API is running...');
//   });
//routes






app.use(cors({
    origin: "process.env.CORS_ORIGIN", // replace with your frontend URL
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}))
 app.use(express.json({limit:"16kb"}))

 app.use(express.urlencoded({extended:true,limit:"16kb"})) // extended 

 app.use(express.static("public")) // serve static public for the whole pdf png 
app.use(cookieParser());


app.use("/api/v1/users", Userouter);


// http:localhost:8000/api/v1/user/register
//for login router url 
//http:localhost:8000/api/v1/user/login








export default app;


//(err,res,resp, next) 