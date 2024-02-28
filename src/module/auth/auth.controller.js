import { User } from "../../../database/models/user.model.js"


export const profilePic = async(req,res,next)=>{
const id = req.payLoad.id

await User.findByIdAndUpdate({_id:id} , {profilePic:req.file.path})

    return res.json({
        success:true,
        message:"profile pic uploaded successfuly"
    })
};

export const coverPics = async(req,res,next)=>{
const id = req.payLoad.id
const user = await User.findById(id)
 req.files.forEach((file)=>{
    user.coverPic.push(file.path)
 })
 await user.save()
    res.json({success:true})
}