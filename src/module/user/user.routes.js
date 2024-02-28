import { Router } from "express";
import * as userController from "./user.controller.js"
import { User } from "../../../database/models/user.model.js";
import { asyncHandler } from "../../utlis/asyncHandler.js";
import {validation} from "../../middleware/validation.middleware.js"
import { activateAccSchema, forgetCodeSchema, loginSchema,  resetCodeSchema, signupSchema } from "./user.schema.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";

const userRouter = Router()

userRouter.post('/signUp',validation(signupSchema) ,asyncHandler(userController.signUp ) );
userRouter.post('/logIn', validation(loginSchema),asyncHandler(userController.logIn) )
userRouter.put('/updateUser/:id',isAuthenticated ,asyncHandler( userController.updateUser))
userRouter.delete('/deleteUser/:id',isAuthenticated,asyncHandler(userController.deleteUser) )
userRouter.put('/changePassword',isAuthenticated,asyncHandler(userController.changePassword))
userRouter.post('/logOut' , isAuthenticated ,asyncHandler( userController.logOut));


userRouter.get('/activate_account/:token',validation(activateAccSchema) , asyncHandler(userController.activateAccount))
userRouter.put('/forget_code', validation(forgetCodeSchema) , asyncHandler(userController.sendCode));
userRouter.post('/reset_password', validation(resetCodeSchema) , userController.resetPassword)

export default userRouter