import { User } from "../../../database/models/user.model.js";
import { Message } from './../../../database/models/message.model.js';

export const sendMessage = async (req ,res ,next)=>{

    const user = User.findOne(req.body.receiverId)
    if(!user) return next(new Error("Receiver not found" ,{cause:404}));

   await Message.create(req.body)
    res.json({success:true , message:"message created successfuly"})

}


export const allMsg = async (req , res , next)=>{

    const test =await Message.find().populate("receiverId")
    res.json({message:test})
}