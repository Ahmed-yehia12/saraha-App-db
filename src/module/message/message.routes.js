import { Router } from "express";
import * as messageController from "./message.controller.js"
import { asyncHandler } from './../../utlis/asyncHandler.js';

import { validation } from './../../middleware/validation.middleware.js';
import { sendMessageSchema } from "./message.schema.js";
import { isAuthenticated } from "../../middleWare/auth.middleWare.js";





const messageRouter = Router()


messageRouter.post('/',validation(sendMessageSchema), asyncHandler(messageController.sendMessage))

messageRouter.get('/getAll' , asyncHandler(messageController.allMsg))

export default messageRouter 