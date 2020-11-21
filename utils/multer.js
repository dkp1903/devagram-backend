const { error } = require('console');
const multer=require('multer')
const path=require('path')


module.exports=multer({
    storage:multer.diskStorage({}),
    fileFilter:(req,file,cb)=>{
        let ext=path.extname(file.originalname);
        if(ext!=='.jpeg' && ext!=='.jpg' && ext!=='.png'){
            cb(new Error("File not supported to be uplaoded !!"),false)
            return ;
        }
        cb(null,true)
    }
})