import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from "mongoose";

const userSchema=new Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true

        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
            

        },
        fullname:
        {
            type:String,
            required:true,
            trim:true,
            index:true
            

        }
        ,
        awtar:{
            type:String, //cloudinary url
            required:true
        },
        coverimg :{
            type:String, //cloudinary url

        }
        ,
        watchhistory:[{
            type:Schema.Types.ObjectId,
            ref:"video"

        }],
        password:{
            type:string, 
            required:[true,"passeord is required"]
        }
        ,
        refreshtoken :{
            type:String 
        }

}
,{timestamps:true});

//pre is hook from middlwwares
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) returnnext();
    this.password=bcrypt.hash(this.password,10);
    next();

})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccesstoken= function(){
   return  jwt.sign(
        {
        _id:this._id,
        username:this.username,
        fullname:this.fullname,
        emial:this.email
        },
        process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY

        }
    )
}
userSchema.methods.generateRefreshtoken= function(){
    return  jwt.sign(
        {
        _id:this._id,
      
        },
        process.env.REFRESH_TOKEN_SECRET,{
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY

        }
    )
}
export const User=mongoose.model("User",userSchema);