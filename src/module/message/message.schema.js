import  Joi  from 'joi';
import { objectIdValidation } from '../../middleware/validation.middleware.js';


export const sendMessageSchema = Joi.object({
    content: Joi.string().min(10).max(100).required(),
    receiverId: Joi.custom(objectIdValidation).required()
     
}).required()