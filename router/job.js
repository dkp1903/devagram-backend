const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Job = mongoose.model("Job")
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const requirelogin = require('../middlewares/requireLogin')

router.get('/jobs',requirelogin,(req,res)=>{
    Job.find()
    .populate("jobs","job_title job_type job_description job_start location salary")
    .then(all_jobs=>{
        res.json({jobs:all_jobs});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/createjob',requirelogin, async (req,res)=>{
    const {job_title,job_type,job_description,job_start,location,salary} = req.body;  
    if(!job_title || !job_type || !job_description || !job_start || !location || !salary)
    {
        return res.status(422).json({error:"Please enter all details."});
    }
    compquery = req.user._id;
    try{
    const savedjob = await Job.findOne({companyOrOrganization:compquery,job_title,job_type,location})
        if(savedjob){
            return res.status(422).json({error:"Job with same credentials already exists."});
        }
        const newJob = new Job({
            job_title,
            job_type,
            job_description,
            job_start,
            location,
            salary,
            companyOrOrganization:compquery,
        })
        try{
        await newJob.save()
        res.json({message:"Job created successfully."});
        }
        catch(err){
            console.log(err);
        }
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router
