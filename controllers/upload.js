var multer = require('multer')
var fs= require('fs')
const { decrptObject, encryptObject } = require('../auth/encrypt')
var path='public/'
   const uploadFile=(req,res)=>{
       try{
     //setting storage
     var storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'public')
        },
        filename : (req,file,cb)=>{
          cb(null,file.originalname)
        }
    })
       //saving
var upload = multer ({storage:storage}).array('file')
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            return res.status(500).json({upload:false,error:false})
        }
        else if (err){
            return res.status(500).json({upload:false,error:false})
        }
        return res.status(200).send({upload:true,error:false})
})
       }
       catch(err){
console.log(err)
       }
  
}
const deleteFile=async (req,res)=>{
    try{
        //decrypting request
     const decrypt=decrptObject(req.body.data)
     const {file} =decrypt   
     fs.unlinkSync(path+file)
     //encrpting response
     const encrypt=encryptObject({deleted:true})
      res.send({encrypt})
    }
     catch(err){
         console.log(err)
         let encrypt=encryptObject({deleted:false})
         res.send(encrypt)
     }
}
const letterFiles=async (req,res)=>{
    
try
    {      
        var date=Date.now()     
    var storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,'public')
        },
        filename : (req,file,cb)=>{
          cb(null,date+file.originalname)
        }
    })
       //saving
var upload = multer ({storage:storage}).array('file')
    upload(req,res,(err)=>{
        if(err instanceof multer.MulterError){
            return res.status(500).json({upload:false,error:false})
        }
        else if (err){
            return res.status(500).json({upload:false,error:false})
        }
        return res.status(200).send({upload:true,date,error:false})
})
}
catch(err){
    console.log(err)
    return res.status(500).json({upload:false,error:true})
}
}
module.exports={uploadFile,deleteFile,letterFiles}