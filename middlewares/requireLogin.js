require('dotenv').config();
const mongoose=require('mongoose')
const User=require('../models/user_schema')
const jwt=require('jsonwebtoken')
const JWT_TOKEN=process.env.JWT_SECRET;
module.exports=(req,res,next)=>{
    const {authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:'You must be logged in'})
    }
    const token =authorization.replace("Bearer ","");
    jwt.verify(token,JWT_TOKEN,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"You must be logged in"});
        }

        const {_id}=payload
        User.findById(_id).then(userData=>{
            req.user=userData;
            next();
        })
    })

}