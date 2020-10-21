const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    profile_picture:{
        type: String,
        required: true
    },
    followers:{
        type: BigInt,
        required: true
    },
    following:{
        type: BigInt,
        required: true
    },
    devrole:{
        type: String,
        required: true
    },
    no_of_posts:{
        type: BigInt,
        required: true
    },
    description:{
        type:String,
        required:true
    }
})

mongoose.model("User",UserSchema)
