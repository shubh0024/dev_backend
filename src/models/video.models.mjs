import mongoose from "mongoose"

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchemas= new Schema(
 {
    videoFile:{
        type:String, //cloudnary ur;
        required:true,

    },
    thumbnail:{
     type:String ,
     required:true,
    },
    title:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:false,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }

},
{
    timeStamps:true
}
)


videoSchemas.plugin(mongooseAggregatePaginate);

const Video = mongoose.model('Video',videoSchemas)
export default Video;