const Place=require('../db/placeSchema')
const { encryptObject,decrptObject } = require('../auth/encrypt')

const getPlaces=async (req,res)=>{
     try{
  const get=await Place.find({})
let places=encryptObject(get.reverse())
res.send(places)
     }
     catch(err){
        console.log(err)
        let error=encryptObject({error:err})
        res.send(error)
     }
}
const createPlace=async (req,res)=>{
  try{
 const place=decrptObject(req.body.data)
 const savePlace=new Place(place)
 const SavePlace=await  savePlace.save()
   const encrypt=encryptObject({created:true,error:false,
    message:'Created Successfully',SavePlace}) 
  res.send(encrypt)  
}
  catch(err){
      console.log(err)
  let encrpt=encryptObject({created:false,error:false,message:err})
  res.send(encrpt)
  }
}
const editPlaces=async (req,res)=>{
    try{
     let decrypt=decrptObject(req.body.data)
     let {_id}=decrypt
     let Id=_id?true:false
     if(Id){
       /**updating  */
      const Update = await Place.findByIdAndUpdate(_id,decrypt)
      /**encrpting response */
      const encrypt=encryptObject({Update,updated:true,error:false})
      res.send(encrypt)
     }
     else{
       throw new Error('id is not set')
     } 
    }
    catch(err){
        console.log(err)
        /**send error */
        let encrypt=encryptObject({error:true,message:err})
        res.send(encrypt)
    }
}
const Delete = async (req,res)=>{
  try{
      const decrpt=decrptObject(req.body.data)
      let {_id}=decrpt
      if(_id===undefined)
      throw new Error('_id is not set')
      const del=await Place.findByIdAndDelete(_id)
      let encrpt=encryptObject({del,deleted:true,error:false,message:''})
      res.send(encrpt)
  }
  catch(err){
  console.log(err)
  let encrpt=encryptObject({deleted:false,error:true,message:err})
  res.send(encrpt)
  }
}
module.exports={createPlace,getPlaces,editPlaces,Delete}