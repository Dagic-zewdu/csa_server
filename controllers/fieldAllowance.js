const FieldAllowance=require('../db/fieldAllowanceSchema')
const { decrptObject, encryptObject } = require('../auth/encrypt')
const create=async (req,res)=>{
   try{
       //setting unique employee id is done on the client side 
       //decrypting request
       const decrypt=decrptObject(req.body.data)
       const field=new FieldAllowance(decrypt)
       const Save=await field.save()
       const encrypt=encryptObject({created:true,error:false,message:'created successfully',data:Save})
       res.send(encrypt) 
    }
   catch(err){
    console.log(err)
    const encrypt=encryptObject({created:false,error:true,message:'can not create a user',err})
    res.send(encrypt)
   }
}
const getEmployees=async (req,res)=>{
    try{
      const employees=await FieldAllowance.find({})
      let encrypt=encryptObject(employees.reverse())
      res.send(encrypt)
    }
    catch(err){
        console.log(err)
    let encrypt=encryptObject({err})
     res.send(encrypt) 
    }
}
const editFieldEmployees=async (req,res)=>{
    try {
        //decrypting request
        let decrypt = decrptObject(req.body.data)
        //checking _id and emp_id exists
        let { _id } = decrypt
        let Id = _id ? true : false
        if (Id) {
          /**updating  */
          const Update = await FieldAllowance.findByIdAndUpdate(_id, decrypt)
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
const deleteFieldAllowance=async (req,res)=>{
    try {
        const decrpt = decrptObject(req.body.data)
        let { _id } = decrpt
        if (_id === undefined)
          throw new Error('_id is not set')
        const del = await FieldAllowance.findByIdAndDelete(_id)
        let encrpt = encryptObject({ del, deleted: true,
             error: false, message: 'Deleted successfully' })
        res.send(encrpt)
      }
      catch (err) {
        console.log(err)
        let encrpt = encryptObject({ deleted: false, error: true, message: err })
        res.send(encrpt)
      }
}
module.exports={create,getEmployees,editFieldEmployees,deleteFieldAllowance}