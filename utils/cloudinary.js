const cloudinary=require('cloudinary').v2
// The given credentials can be obtained by making a account at cloudinary

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
module.exports=cloudinary;