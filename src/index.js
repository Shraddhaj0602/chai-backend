// const { default: mongoose } = require('mongoose');
import connectDB from "./db/index.js";
// const {connectDB}=require('./db/index.js');
// require ('dotenv').config({path:'./env'})

import dotenv from "dotenv";
dotenv.config({
  path:'../env'

})
connectDB()
// after database connection we have to return promises because we  use asyn function 
.then(()=>
  { app.listen(process.env.PORT || 8000,()=>{
    console.log(`server is running at port : ${process.env.PORT}`);}
  )
})
  
.catch((err)=>{
  console.log("Mongo Db connection Failed")
});


 /*
 import express from "express";
  const app=express();

(async()=>{
try
{
   await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
   app.on("error",(err)=>{
    console.log("ERORRR",err);
    throw err;

   })

   app.listen(process.env.PORT,()=>{
    console.log(`APP is listening on ${process.env.PORT}`);
   })
 }
catch(error){
    console.error("ERROR!",error)
}
}
)

();
*/