const asyncHandler = (requestHandler) =>{
 return  (req,res,next) =>{  //due to higher order requests function they need to be return 
    Promise.resolve(requestHandler(req,res,next)).
    catch((err) => next(err))
  }
}

export {asyncHandler}





//const asyncHandler = () =>{}
    //const asyncHandler=(func) => ()=>{}
        //const asyncHandler=(func) => async ()=>{}








//     const asyncHandler =(fn)=>async (req ,res,next)=>{
//     try {

// await fn(req ,res,next);

//     } catch (err) {
//         console.error(err);
//         res.status(500).send(err.code || 500).json({
//             success:false, //flag 
//             message:err.message
//         });
//     }
// }

