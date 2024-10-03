import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
        });

const uploadOnCloudinary = async (localfilepath)=>{ //pass the argument as local filepath
    try{
        if(!localfilepath) return null;

        //upload the file to the cloudinary
        const result = await cloudinary.uploader.upload(localfilepath, {
            resourse_type :"auto"

 //fs.unlinkSync(localfilePath)
        });

        //file has been successfully uploaded
        console.log("file has been successfully uploaded",result.url);

       

//  // Delete the local file after upload
//  if (fs.existsSync(localfilepath)) {
//     fs.unlinkSync(localfilepath);
//     console.log("Local file deleted after upload.");
//}
return result.url; //it can be return to user

    }catch(error){
        //delete the local file if exits with temporary avalable 
        if(fs.existsSync(localfilepath))  //check if file exists
    
        fs.unlinkSync(localfilepath);
        console.log("error ",error);
    }
}
export {uploadOnCloudinary}