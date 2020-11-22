const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const hack = mongoose.model("Hackathons")
const requirelogin = require('../middlewares/requireLogin')

router.get('/hackathons',requirelogin,(req,res)=>{
    hack.find()
    .populate("hackathons","title hackathon_poster hackathon_description organizers start_date end_date important_links")
    .then(allhacks => {
        res.json({hackathons:allhacks});
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/createhackathon',requirelogin, async (req,res)=>{
    const {title,hackathon_poster,hackathon_description,start_date,end_date} = req.body;  
    if(!title || !hackathon_poster || !hackathon_description || !start_date || !end_date)
    {
        return res.status(422).json({error:"Please enter all details."});
    }
    const currdatetime = new Date();
    if(currdatetime >= start_date)
    {
        return res.status(422).json({error:"Start date and time can't be before current date and time."})
    }
    if(start_date >= end_date)
    {
        return res.status(422).json({error:"Start date and time can't be before end date and time."})
    }
    compquery = req.user._id;
    try{
    const savedhackathon = await hack.findOne({organizers:compquery,title,start_date,end_date})
        if(savedhackathon){
            return res.status(422).json({error:"Hackathon with same credentials already exists."});
        }
        const newhackathon = new hack({
            title,
            hackathon_poster,
            hackathon_description,
            start_date,
            end_date,
            organizers:compquery,
        })
        try{
        await newhackathon.save()
        res.json({message:"Hackathon created successfully."});
        }
        catch(err){
            console.log(err);
        }
    }
    catch(err){
        console.log(err);
    }
})

router.delete('/hackathons/:id',requirelogin, async (req,res)=>{
    const {id} = req.params;
    try{
    const findhackathon = await hack.findById(id)
        if(!findhackathon) return res.status(422).json({error:"Hackathon doesn't exist."});
        const oriuser = findhackathon.organizers;
        if(toString(req.user._id) === toString(oriuser))
        {
            try{
              const delhackathon = await hack.findByIdAndDelete(req.params.id)
              if(!delhackathon) return res.status(422).json({error:"Hackathon doesn't exist."});
              return res.json({message:"Hackathon deleted successfully."});
            }
            catch(err){
                console.log(err);
            }
        }
        else{
             return res.status(401).json({error:"Hackathon access denied."});
          }
        }
    catch(err){
        console.log(err);
    }
  })

  router.post('/hackathons/:id',requirelogin, async (req,res)=>{
    const {id} = req.params;
    try{
        const foundhackathon = await hack.findById(id);
        if(!foundhackathon) return res.status(422).json({error:"Hackathon doesn't exist."})
        if(toString(foundhackathon.organizers) != toString(req.user._id))
        {
            return res.status(401).json({error:"Hackathon access denied"});
        }
        const {title,hackathon_poster,hackathon_description,start_date,end_date} = req.body;  
        if(!title || !hackathon_poster || !hackathon_description || !start_date || !end_date)
        {
            return res.status(422).json({error:"Please enter all details."});
        }
        const currdatetime = new Date();
        if(currdatetime >= start_date)
        {
            return res.status(422).json({error:"Start date and time can't be before current date and time."})
        }
        if(start_date >= end_date)
        {
            return res.status(422).json({error:"Start date and time can't be before end date and time."})
        }
        try{
        const succ = await hack.findByIdAndUpdate(id,{
            title,
            hackathon_poster,
            hackathon_description,
            start_date,
            end_date,
            organizers: req.user._id,
        })
        return res.json({message:"Hackathon details updated successfully."});
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
