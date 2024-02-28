import { Token } from "../../database/models/token.model.js";
import { User } from "../../database/models/user.model.js";
import { asyncHandler } from "../utlis/asyncHandler.js";
import jwt  from 'jsonwebtoken';


export const isAuthenticated = asyncHandler(async(req,res,next)=>{
    let {token} = req.headers;
    if(!token) return next(new Error("token missing",{cause:404}))
    if(!token.startsWith(process.env.BERAER_KEY))return next(new Error("invalid token",{cause:401}))

    token= token.split(process.env.BERAER_KEY)[1];

    const tokenDB = await Token.findOne({token , isValid:true});
    if (!tokenDB) return next(new Error("token expired!",{cause:401}))
    const payLoad =jwt.verify(token ,process.env.TOKEN_SECRET);


    const isUser = await User.findById(payLoad.id);
    if(!isUser) return next(new Error("user not found"),{cause:404})
    req.payLoad = payLoad
    return next();
})