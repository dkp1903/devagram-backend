const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Job = mongoose.model("Job")
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const requirelogin = require('../middleware/requireLogin')

router.get('/jobs',requirelogin,(req,res)=>{
    Job.find()
    .populate("jobs","_id role company_name location requirement useful_links")
    .then(all_jobs=>{
        res.json({jobs:all_jobs});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/createjob',(req,res)=>{
    const {authorization} = req.headers;
    if (!authorization) {
        return res.status(401).json({
          error: "You must be logged in",
        });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        error: "You must be logged in"
      });
    }
    const {_id} = payload;
    const {job_title,job_type,job_description,job_start,location,salary} = req.body;  
    if(!job_title || !job_type || !job_description || !job_start || !location || !salary)
    {
        return res.status(422).json({error:"Please enter all details."});
    }
    compquery = _id;
    Job.findOne({compquery,job_title,job_type,location})
    .then(savedjob=>{
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
            companyOrOrganization:_id,
        })
        newJob.save()
        .then(nj=>{
            res.json({message:"Job created successfully."});
        })
        .catch(err=>{
            console.log(err);
        })
    })
    })
})
