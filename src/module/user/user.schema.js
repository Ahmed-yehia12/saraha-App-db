import Joi from "joi";

export const signupSchema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirmedPassword:Joi.string().valid(Joi.ref("password")).required(),
    age:Joi.number().min(18).max(80),
}).required()


export const loginSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
}).required()

export const activateAccSchema = Joi.object({
    token:Joi.string().required()
}).required()


export const forgetCodeSchema = Joi.object({
    email:Joi.string().email().required(),
}).required()

export const resetCodeSchema = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    confirmedPassword:Joi.string().valid(Joi.ref("password")).required(),
    code:Joi.string().required()
}).required()