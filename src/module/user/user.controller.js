import { Token } from "../../../database/models/token.model.js";
import { User } from "../../../database/models/user.model.js"
import bycript from 'bcryptjs'
import jwt from "jsonwebtoken";
import Joi from "joi";
import { sendEmail } from "../../utlis/sendEmail.js";
import randomstring from 'randomstring'

export const signUp = async(req , res, next)=>{
 
    const {email}= req.body
    const isUser =await User.findOne({email});
    if(isUser) return next(new Error("email is already exist"))
    const hashPassword = bycript.hashSync(req.body.password , parseInt(process.env.SALT_ROUND))
   const user =await User.create( {...req.body ,password:hashPassword});

    const token = jwt.sign({email: user.email}, process.env.TOKEN_SECRET);
  await sendEmail({
    to:user.email ,
    subject:"Account activation",
    html:`<a href='http://localhost:4000/user/activate_account/${token}' >Activate your account</a>`
  })
   res.json({success:true, message:"user created successfuly"})


};
export const logIn= async(req , res ,next)=>{

    const {email} = req.body;
    const isUser = await User.findOne({email});
    if(!isUser) return next(new Error("Email is invalid")) 

   
if(!isUser.isConfirmed) return next(new Error("you should activate your account first"))


   
    const match = bycript.compareSync(req.body.password , isUser.password)
    if(!match) return next(new Error("password is invalid"))
    

    const token =jwt.sign({id:isUser._id , email:isUser.email},process.env.TOKEN_SECRET)
    await Token.create({token , user:isUser._id,agent: req.headers["user-agent"]})
    res.json({success:true , token})

}

export const updateUser = async(req , res , next)=>{

    const {userName , age , gender , email}=req.body;
    const {id } = req.params;
    
    const isUser = await User.findOneAndUpdate({_id:id }, {userName  , age , gender , email},{new:true});
    if (!isUser) return next(new Error("user not found"))
    //  res.json({success:false, message:"user not found"});
    res.json({success:true , message:"user updated succesfuly"});
    

    }

export const deleteUser = async (req ,res , next)=>{

    const {id}= req.params;
    const isUser = await User.findByIdAndDelete(id);
    if(!isUser) return next(new Error("user not foun"))
    // res.json({success:false , message:"user not found"});
    res.json({success:true , message:"user deleted successfuly"});

}    

export const changePassword = async (req,res ,next)=>{
    const {password} = req.body;
    const id = req.payLoad.id
    console.log(id);
    if(!id) return next(new Error("user not logged!"));
    
    const hashPassword = bycript.hashSync(password , 8);
    const isUpdated = await User.findByIdAndUpdate({_id:id}, {passwrd:hashPassword});
    res.json({success:true , message:"password changed successfuly" , isUpdated})
}




export const logOut = async(req,res,next)=>{
    const {token}= req.headers ;
   const x = await Token.findOneAndUpdate({},{isValid:false})
   if(!x) return next(new Error("token not found"))
    res.json({success:true , message:"user logged out"})

}


export const activateAccount = async(req,res,next)=>{
const {token} = req.params;
const payload = jwt.verify(token , process.env.TOKEN_SECRET)
console.log(payload);
const user = await User.findOneAndUpdate({email: payload.email} ,
    {isConfirmed:true} , 
    {new:true});
return res.send("Account avtivated successfuly try login now!")
}


export const sendCode= async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});
    if(!user) return next(new Error("email not found"))
    if(!user.isConfirmed) return next(new Error("activate your account first"));

    const code = randomstring.generate({
        length:5 , 
        charset:"numberic"
    });

    user.forgetCode = code 
    await user.save()

    const messageSent = await sendEmail({
        to: user.email,
        subject:"reset password",
        html:`<div>${code}</div>`
    })

if(!messageSent) next (new Error("email is invalid"))

return res.send("you can reset your password now")


}



export const resetPassword = async(req,res,next)=>{
    let user = await User.findOne({email:req.body.email});
    if(!user) return next(new Error("email not found"))

    if(user.forgetCode !== req.body.code) return next(new Error("invalid code"))

    user.password = bycript.hashSync(req.body.password , parseInt(process.env.SALT_ROUND))
    await user.save()

    const tokens = await Token.find({user:user._id});

    tokens.forEach(async(token)=>{
        token.isValid = false ;
        await token.save()
    })

 
    
    return res.json({success:true , message:"try login now"})

}