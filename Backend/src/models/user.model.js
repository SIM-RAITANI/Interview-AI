import mongoose, { mongo } from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username already taken"],
        required:true
    },email:{
        type:String,
        required:true,
        unique:[true,"Account Already taken with this email address"]
    },
    password:{
        type:String,
        required:true 
    }
});

const userModel=mongoose.model("users",userSchema)

export default userModel