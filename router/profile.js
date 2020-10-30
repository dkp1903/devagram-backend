const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const Post = require("../models/post_schema")

//controllers
const { getProfile, editUser } = require("../controllers/profile.controller");

//middleware
const requireLogin = require("../middlewares/requireLogin");

//error handeler
const showError=require('../config/showError');

router.get("/", requireLogin, getProfile);

router.put("/", requireLogin, editUser);

router.post("/createPost",requireLogin,async (req,res)=>{
    const {content,img}=req.body;
    if(!content || !img){
        return res.status(422).json({err:"Please add all the fields!"})
    }
    try {
        req.user.password=undefined;//to prevent it from getting stored in the "user" field 
        const post= new Post({
            content:content,
            img:img,//this would be the url for image stored in the cloud 
            user:req.user
        })
        const result =await post.save()
        res.status(200).json({post:result,message:"Post uploaded sucessfully !"})

    } catch (error) {
        showError(error,res);
    }
    
})

module.exports = router;
