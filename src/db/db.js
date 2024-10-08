import mongoose from 'mongoose';

import { DB_NAME } from "../constant.js";

const connectDB = async () =>{

    try{

     const connectionInstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
     console.log(`\n MongoDB connected successfully to Db ${connectionInstance.connection.host} and DB: ${connectionInstance.connection.name}`);

    }catch(error){
        console.log("error",error);
        process.exit(1);
    }
}

export default connectDB;
