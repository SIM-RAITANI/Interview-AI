import userModel from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import blacklistModel from "../models/blacklist.model.js";

/**
 * 
 * @name registerUser
 * @description register a new user using email , username and password
 * @access PUBLIC
 */
export const registerUser=async(req,res)=>{
     const {username,email,password}=req.body;

     if (!username || !email || !password){
        return res.status(400).json({
            message:"Please provide username,email and password"
        })
     }

     const isUserAlreadyExists=await userModel.findOne({
        $or:[{username},{email}]
     })

     if (isUserAlreadyExists){
        return res.status(400).json({
            message:"Account already exists with this email and password"
        })
     }
     const hash=await bcrypt.hash(password,10)
     const user=await userModel.create({
        username,
        email,
        password:hash
     })

     const token=await jwt.sign(
        {id:user._id,username:username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
     )

     res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"none",
        maxAge:24*60*60*1000
     })
     res.status(201).json({
        message:"User Registered Successfully",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
     })
}

/**
 * 
 * @name loginUser
 * @description login a existing user using email , username and password
 * @access PUBLIC
 */
export const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    const user=await userModel.findOne({email})
    if (!user){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }

    const isPasswordMatch=await bcrypt.compare(password,user.password)
    if (!isPasswordMatch){
        return res.status(400).json({
            message:"Invalid Email or Password"
        })
    }
     
    const token=jwt.sign(
        {id:user._id,username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
     )

     res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"none",
        maxAge:24*60*60*1000
     })
     res.status(201).json({
        message:"User Login Successfully",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
     })
    
}

/**
 * 
 * @name logoutUser
 * @description logout a existing user
 * @access PUBLIC
 */
export const logoutUser=async(req,res)=>{
    const token=req.cookies.token
    if (token){
        await blacklistModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"User Logged Out Successfully"
    })
}

export const getMe=async(req,res)=>{
    const user=await userModel.findById(req.user.id)
    if (!user){
        return res.status(404).json({
            message:"User Not Found"
        })
    }
    res.status(200).json({
        message:"User Found",
        user:{
            username:user.username,
            id:user._id,
            email:user.email
        }
    })
}
