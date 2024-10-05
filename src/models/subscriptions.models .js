import mongoose,{Schema} from "mongoose"

const subscriptionSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId, //one who is subscriber
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId, //the channel to which subscriber is subscribed
        ref:"Channel"
    }
})

export const SubscritionSchema=mongoose.model("Subscription")