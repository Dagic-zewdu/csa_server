const { encryptObject, decrptObject } = require('../auth/encrypt')
const Places=require ('../db/ClimatePlacesSchema')

/**get all data */
const getClimatePlaces=async (req,res)=>{
    const places=await Places.find({})
    let data=encryptObject(places.reverse())
    res.send(data)
}
/**create multiple climate place */
const createClimatePlaces=async (req,res)=>{
    try{
     const {places}=decrptObject(req.body.data)
    const save=await Places.insertMany(places)
    let Data = encryptObject({ created: true,data: save,
        error: false,message:'created successfully' })
    res.send(Data)
    }
    catch(err){
        console.log(err)
        const encrypt=encryptObject({created:false,error:true,message:'can Save company',err})
        res.send(encrypt)
    }
}
/**create single climate place */
const createClimatePlace=async (req,res)=>{
    try{
     const place=decrptObject(req.body.data)
     const newPlace=new Places(place)
     const save=await newPlace.save()
     let Data = encryptObject({ created: true,data: save,
        error: false,message:'created successfully' })
    res.send(Data) 
    }
    catch(err){
        console.log(err)
        const encrypt=encryptObject({created:false,error:true,message:'can Save company',err})
        res.send(encrypt)
    }
}
/**update enter general name of the record */
const updateGeneralName=async (req,res)=>{
     try{
    const {general_name,gname}=decrptObject(req.body.data)
    Places.updateMany(
        {general_name:gname},{$set :{general_name}},
        (err,Update)=>{
        if(err){
          throw new Error(err)  
        }
        else{
    const encrypt = encryptObject({ Update, updated: true, error: false })
            res.send(encrypt)     
        }    
        }
    )
     }
     catch(err){
         console.log(err)
        let encrypt = encryptObject({ error: true, message: err })
        res.send(encrypt)
     }
}
/**remove multiple places from the lsit */
const removePlaces=async (req,res)=>{
    try{
    const {Places_id}=decrptObject(req.body.data)
    Places.deleteMany({
        _id:{ $in :Places_id}
    },(err,del)=>{
        if(err){
            throw new Error(err)
        }
       else{
        let encrpt = encryptObject({ del, deleted: true, error: false,
             message: 'Remove successfully' })
        res.send(encrpt) 
       } 
    })
    }
    catch(err){
        console.log(err)
    let encrpt = encryptObject({ deleted: false, error: true, message: err })
        res.send(encrpt)
    }
}
module.exports={getClimatePlaces,createClimatePlaces,
               createClimatePlace,updateGeneralName,
               removePlaces}