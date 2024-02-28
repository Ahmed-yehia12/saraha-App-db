import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name:{type:String , required:true,} , 
    email:{type:String , uniqe:true , required:true,} , 
    password:{type:String ,  required:true,},
    age:{type:Number ,  required:true,},
    isConfirmed:{ type:Boolean , default:false},
    forgetCode:{type:String , uniqe: true},
    profilePic:{type:String},
    coverPic:[String]
},
{
    timestamps: true,
}
);
export const User = mongoose.model("user", userSchema);