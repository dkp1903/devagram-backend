require('dotenv').config()
const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const User=require('../models/user_schema')
const requireLogin = require('../middlewares/requireLogin')                      //this is the middleware for authoraistion and peventing from routing without the regestration 
const JWT_SECRET = process.env.JWT_SECRET


 router.post('/signup',(req,res)=>{
    const {name,username,password,email,description,devrole} = req.body
    console.log(req.body)
    if(!name || !username || !password || !email || !devrole || !description)
    {
        return res.status(422).json({message:"Please fill all fields"})
    }
    bcrypt.hash(password,12)
    .then(haspassword=>{
        User.findOne({username:username})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"Username already exists. PLease enter other username"})
            }
            User.findOne({email:email})
            .then((dupemail)=>{
                if(dupemail){
                    return res.status(422).json({error:"Email already exists. Please enter other email."})
                }
                const user = new User({
                    name,
                    username,
                    password:haspassword,
                    email,
                    description,
                    devrole
                })
                user.save()
                .then(user=>{
                    res.json({message:"Profile is created successfully."})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
    })
    })
        .catch(err=>{
            console.log(err)
        })
})


 router.post('/signin',(req,res)=>{
     const {email,password}=req.body
     if(!email || !password){
         return res.status(422).json({error:"Please fill out all the fields"})
     }
     User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid email or password"})
            }
            bcrypt.compare(password,savedUser.password)
                .then(doMatch=>{
                    if(doMatch){
                        const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                        res.json({message:"Signed in sucessfully",token:token})
                    }
                    else{
                return res.status(422).json({error:"Invalid email or password"})
                    }
                })
                .catch(err=>console.log(err))
        }).catch(err=>console.log(err))
 })
 module.exports=router
