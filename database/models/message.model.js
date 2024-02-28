import { Schema, Types, model } from "mongoose";



const messageSchema = new Schema({
content:{type:String , required:true},

receiverId:{type:Types.ObjectId , ref:"user"}
},
{
    timestamps:true,
});

export const Message = model('Message', messageSchema)