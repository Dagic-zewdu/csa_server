const configuration=require('../db/configurationSchema')
const { decrptObject,encryptObject} = require('../auth/encrypt')
 
const createConfigaration=async (req,res)=>{
  try{
        const decrypt=decrptObject(req.body.data)
        const saveConfig=new  configuration(decrypt)
        const SaveConfig=await  saveConfig.save()
          const encrypt=encryptObject({
              created:true,error:false,
           message:'Created Successfully',SaveConfig}) 
         res.send(encrypt)  
       }
         catch(err){
             console.log(err)
         let encrpt=encryptObject({created:false,error:true,message:err})
         res.send(encrpt)
         }
}
const getConfig=async (req,res)=>{
    try{
          /** getting configuration data */
    const Config = await configuration.find({})
    const encrpt = encryptObject(Config)
    res.send(encrpt)
    }
    catch(err){
     const encrpt = decrptObject({ error: err })
    res.send(encrpt)
    }
}
const editConfig=async (req,res)=>{
    try {
        //decrypting request
        let decrypt = decrptObject(req.body.data)
        //checking _id and emp_id exists
        let { _id } = decrypt
        let Id = _id ? true : false
        if (Id) {
          /**updating  */
          const Update = await configuration.findByIdAndUpdate(_id, decrypt)
          /**encrpting response */
          const encrypt = encryptObject({ Update, updated: true, error: false })
          res.send(encrypt)
        }
        else {
          throw new Error('id is not set')
        }
      }
      catch (err) {
        console.log(err)
        /**send error */
        let encrypt = encryptObject({ error: true, message: err })
        res.send(encrypt)
      }   
}
module.exports={createConfigaration,editConfig,getConfig}