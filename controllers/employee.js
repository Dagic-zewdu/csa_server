const employee=require('../db/employeeSchema')
const { encryptObject , decrptObject} = require('../auth/encrypt')
const  fieldSchema=require('../db/fieldAllowanceSchema')
const userSchema=require('../db/userSchema')
const getEmployees = async (req,res)=>{
  try{
   const get=await employee.find({})
   const secureEmployee= encryptObject(get.reverse())
  res.send(secureEmployee)
  }
  catch(err){
    console.log(err)
    let error=encryptObject({error:err})
    res.send(error)
  }
} 
const checkId=async (id)=>{
    /**checking id from database */
    try{
   const check=await employee.find({emp_id:id})
   if(check.length>0)
    { return {found:true,id:check} }
    else{
     return{found:false}}
}
catch(err){
  console.log(err)
}
}
  
const createEmployee=async (req,res)=>{
    try{
        /** decrypting request */
        const decrypt=decrptObject(req.body.data)
     const {emp_id:id}=decrypt
     /**checking id if the user is registered before */
     const {found}=await checkId(id)
     console.log(found,id)
     if(!found){
         const User=new employee(decrypt)
         const saveUser=await User.save()
         let Data = encryptObject({ created: true,data: saveUser, error: false,message:'' })
         res.send(Data)
     }
     else{
    let foundError=encryptObject({created:false,error:false,message:'user has been saved with id before'})
     res.send(foundError)     
}
    }
    catch(err){
console.log(err)
        let error=encryptObject({error:true,created:false,message:err})
  res.send(error)
    }
}

const editEmployees =async (req,res)=>{
  try{
    //decrypting request
       let decrypt=decrptObject(req.body.data)
     //checking _id and emp_id exists
     let {_id,emp_id}=decrypt
     let Id=_id&&emp_id?true:false
     if(Id){
        /**updating user ,field allowance table (emp_id,usertype) after updating the Employee
        * is useful for no data miss match when employee update try to login
        */
       //finding employee with _id
       const findEmployee=await employee.find({_id})
       //finding employee in field_allowance table
       const fieldEmployee=await fieldSchema.find({emp_id:findEmployee[0].emp_id})
       //finding user with find employee emp_id
       const findUser=await userSchema.find({emp_id:findEmployee[0].emp_id})
      //updating employee
      const Update = await employee.findByIdAndUpdate(_id,decrypt)
      //updating user
      if(findUser.length>0){
        //setting usertype
    let user_type=decrypt.type?decrypt.type:Update.type
    //updating user
    const userUpdate=await userSchema.findByIdAndUpdate(findUser[0]._id,
          {emp_id,user_type})
      }
      if(fieldEmployee.length>0){
 const filedEmployeeUpdate=await fieldSchema.findByIdAndUpdate(fieldEmployee[0]._id,
          {emp_id})   
      }
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
      //finding employee with _id
      const findEmployee=await employee.find({_id})
      //finding employee in field_allowance table
      const fieldEmployee=await fieldSchema.find({emp_id:findEmployee[0].emp_id})
      //finding user with find employee emp_id
      const findUser=await userSchema.find({emp_id:findEmployee[0].emp_id}) 
      const del=await employee.findByIdAndDelete(_id)
      if(findUser.length>0){
   
    //updating user
    const userUpdate=await userSchema.findByIdAndDelete(findUser[0]._id)
      }
      if(fieldEmployee.length>0){
 const filedEmployeeUpdate=await fieldSchema.findByIdAndDelete(fieldEmployee[0]._id)   
      }
      let encrpt=encryptObject({del,deleted:true,error:false,message:''})
      res.send(encrpt)
  }
  catch(err){
  console.log(err)
  let encrpt=encryptObject({deleted:false,error:true,message:err})
  res.send(encrpt)
  }
}
module.exports={createEmployee,checkId,getEmployees,editEmployees,Delete}