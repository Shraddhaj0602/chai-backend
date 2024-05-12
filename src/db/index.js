
import mongoose from 'mongoose';
// const { default: mongoose } = require('mongoose');
import { DB_NAME } from '../constants.js';
// const {DB_NAME }=require('../constants.js');
const connectDB=async()=>{
    try{
       const connectionDbInstance= await mongoose.connect(`mongodb+srv://shraddhajoshifeb6:shraddhajoshi0602@cluster0.3pm1tzp.mongodb.net/${DB_NAME}`);
       console.log(`\n Mongo DB connected !! DB HOST: ${connectionDbInstance.connection.host}`);
       console.log("connectioninsatnce "+connectionDbInstance);
    }
    catch(error){
        console.error(" MONGO_DB CONNECTIONERROR !",error)
        process.exit(1);

    }
}
export default connectDB;