const JobSchema = new mongoose.Schema({
    role:{
        type:String,
        required:true
    },
    company_name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    requirement:{
        type:String,
        required:true
    },
    useful_links:{
        type:String
    }
})

mongoose.model("Job",JobSchema)
