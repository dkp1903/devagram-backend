require('dotenv').config();
const express=require('express')
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose');
const User=require('../models/user_schema');
const requireLogin=require('../middlewares/requireLogin')//this is the middleware for authoraistion and peventing from routing without the regestration 
const JWT_SECRET=process.env.JWT_SECRET;


 router.post('/signup',(req,res)=>{
     const {username,email,password}=req.body;
     if(!email || !password ||!username){
         return res.status(422).json({error:"Please enter all the fields"});
     }
     User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"User already exist with this email"});
                        }
                    bcrypt.hash(password,12)
                        .then((hashedPassword)=>{
                            const user= new User({
                                username,
                                email,
                                password:hashedPassword
                            });
                        
                            user.save()
                                .then(user=>
                                    res.json({message:"responce recorded sucessfully"}))
                                .catch(err=>console.log(err.message))
                        })
               
        })
        .catch((err)=>console.log(err.message));
   
     
 })


 router.post('/signin',(req,res)=>{
     const {email,password}=req.body;
     if(!email ||!password){
         return res.status(422).json({error:"Please provide the email or password"});
     }
     User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid email or password"});
            }
            bcrypt.compare(password,savedUser.password)
                .then(doMatch=>{
                    if(doMatch){
                        // res.json({message:"sucessfully loged in"})
                        const token=jwt.sign({_id:savedUser._id},JWT_SECRET)
                        res.json({message:"signed in sucessfully",token:token})
                    }
                    else{
                return res.status(422).json({error:"Invalid email or password"});
                    }
                })
                .catch(err=>console.log(err.message))
        }).catch(err=>console.log(err.message))
 })
 module.exports=router;