import { Router } from "express";
import * as authController from './auth.controller.js'
import { asyncHandler } from "../../utlis/asyncHandler.js";
import { fileValidation, uploadFile } from "../../utlis/multer.js";
import { isAuthenticated } from "../../middleWare/auth.middleWare.js";


 const authRouter = Router()

 authRouter.post('/profile_pic',isAuthenticated,uploadFile({file:"user/profilePic",filter:fileValidation.images}).single("pp") ,asyncHandler(authController.profilePic))

authRouter.post('/cover_pic', isAuthenticated , uploadFile({file:"user/coverPic"}).array("coverPics",3),asyncHandler(authController.coverPics))


 export default authRouter

