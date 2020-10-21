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
    no_of_followers:{
        type: BigInt,
        required: true
    },
    no_of_following:{
        type: BigInt,
        required: true
    },
    followers:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        required: true
    },
    following:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
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
