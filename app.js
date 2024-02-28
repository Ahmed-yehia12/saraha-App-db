import express from 'express';
import mongoose from 'mongoose';
import { mongoConn } from './database/dbConnection.js';
import userRouter from './src/module/user/user.routes.js';
import messageRouter from './src/module/message/message.routes.js';
import cors from 'cors'
import dotenv from 'dotenv'
import authRouter from './src/module/auth/auth.routes.js';

dotenv.config()

const app = express()

const port = 4000


await mongoConn()
app.use(cors()) 

app.use(express.json())

app.use('/uploads', express.static("uploads"))

app.use('/user',userRouter)

app.use('/message', messageRouter)
app.use('/auth', authRouter)

app.all('*', (req,res)=>{
    return res.json({success:false , message:"page not found!"})
});

app.use((error , req , res ,next)=>{
    const statusCode = error.cause || 500
    return res.status(statusCode).json({
        success:false , 
        message:error.message,
        stack: error.stack,
    })
})

app.listen(process.env.PORT || port , ()=>{
    console.log('server is runing ...');
})