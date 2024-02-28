import mongoose from "mongoose"





export const  mongoConn= ()=>{
 return   mongoose.connect(process.env.CONNECTION_URL).then(()=>{
    console.log('database connected ....');
 })  .catch((err)=>{
    console.log('err database', err);
 })

}
