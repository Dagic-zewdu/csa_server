const Letter = require('../db/letterSchema')
const Employee=require('../db/employeeSchema')
const { decrptObject, encryptObject } = require('../auth/encrypt')
const getLetters = async (req, res) => {
  try {
    /** getting all Letter data */
    const Letters = await Letter.find({})
    const encrpt = encryptObject(Letters.reverse())
    res.send(encrpt)
  }
  catch (err) {
    const encrpt = decrptObject({ error: err })
    res.send(encrpt)
  }
}
const createLetter = async (req, res) => {
  try {
    const decrypt = decrptObject(req.body.data)
    let { saveOptions,participants, initial_phase,conseucative} = decrypt
    const newLetter=new Letter(decrypt)
    //saving letter
    const saveLetter=await newLetter.save()
     //checking what is desired in saving options
     console.log(saveOptions)
     if(saveOptions==='draft'){
      let encrypt=encryptObject({created:true,error:false,
        message:'Letter has been successfully saved as a draft'})
        res.send(encrypt)   
     }
     //if it showing to participants
     else if(saveOptions==='participant'){
        let n=participants.length
        //saving to all participants
        if(n>0){
           for(var i=0;i<n;i++){
               //find employee with emp_id
     let  empFind=await Employee.find({emp_id:participants[i].emp_id})
           /**
            * give participation letter to employee founded(empFind)
            * with letter id saved(SaveLetter)
            */
     let giveLetter=await Employee.updateOne({_id:empFind[0]._id},
        {$push:{participation_letter:[{id:saveLetter._id}]}
          })
                
         }
         let encrypt=encryptObject({created:true,error:false,
            message:'Letter save success and the letter is sent to all participants'
        })
            res.send(encrypt)  
        }
     else{
        let encrypt=encryptObject({created:false,error:true,
            message:'their are no participants set to send the letter'
        })
            res.send(encrypt)  
          
     }   
     }
     else if(saveOptions==='forward'){
        const n=initial_phase.length
        //forwarding un conseucative letters to be approved
        if(n>0&&!conseucative){
           for(var i=0;i<n;i++){
               //find employee with emp_id
     let  empFind=await Employee.find({emp_id:initial_phase[i].emp_id})
           /**
            * give approval letter to employee founded(empFind)
            * with letter id saved(SaveLetter)
            */
     let giveLetter=await Employee.updateOne({_id:empFind[0]._id},
        {$push: {accepted_letters:[{id:saveLetter._id}]}
                })
        //update letter table with accepted employees
        let acceptedLetter=await Letter.updateOne({_id:saveLetter._id},{
          $push:{accepted_phase:[
            {emp_id:initial_phase[i].emp_id,
             level:initial_phase[i].level
              }]} 
         })         
         }
         let encrypt=encryptObject({created:true,error:false,
            message:'Letter has been sent for approval'
        })
            res.send(encrypt)  
        }
         //forwarding conseucative letters to be approved
       else if(n>0&&conseucative){
        const sorted=initial_phase.sort((a,b)=>{
          return a.level - b.level
        })
     //getting the first manager
   const manager=initial_phase.filter(m=>{
         return m.level === sorted[0].level
          })
       //give letter to first Managers
       for(var i=0;i<manager.length;i++)   
       {
        //first find _id from emp_id
        let  empFind=await Employee.find({emp_id:manager[i].emp_id})
          /**
            * give approval letter to employee founded(empFind)
            * with letter id saved(SaveLetter)
            */
     let giveLetter=await Employee.updateOne({_id:empFind[0]._id},
      {$push: {accepted_letters:[{id:saveLetter._id}]}
              })
        let acceptedLetter=await Letter.updateOne({_id:saveLetter._id},{
    $push:{accepted_phase:[{emp_id:manager[i].emp_id,
           level:manager[i].level
        }]} 
    })              
      }
      let encrypt=encryptObject({created:true,error:false,
        message:'Letter has been sent for approval'
    })
        res.send(encrypt)
    }
     else{
        let encrypt=encryptObject({created:false,error:true,
            message:'their are no Managers set for approval'
        })
            res.send(encrypt)  
          
     }    
     }
     else if(saveOptions==='DoAll'){
      let m=participants.length
      //saving to all participants
      console.log(m)
      if(m>0){
         for(var i=0;i<m;i++){
             //find employee with emp_id
   let  empFind=await Employee.find({emp_id:participants[i].emp_id})
         /**
          * give participation letter to employee founded(empFind)
          * with letter id saved(SaveLetter)
          */
   let giveLetter=await Employee.updateOne({_id:empFind[0]._id},
      {$push:{participation_letter:[{id:saveLetter._id}]}
        })
              
       }
         
      }
   else{
      let encrypt=encryptObject({
        created:false,error:true,
    message:'their are no participants set to send the letter'
        })
          res.send(encrypt)  
     } 
     const n=initial_phase.length
     //forwarding un conseucative letters to be approved
     console.log(n)
     if(n>0&&!conseucative){
        for(var i=0;i<n;i++){
            //find employee with emp_id
  let  empFind=await Employee.find({emp_id:initial_phase[i].emp_id})
        /**
         * give approval letter to employee founded(empFind)
         * with letter id saved(SaveLetter)
         */
  let giveLetter=await Employee.updateOne({_id:empFind[0]._id},
     {$push: {accepted_letters:[{id:saveLetter._id}]}
             })
     //update letter table with accepted employees
     let acceptedLetter=await Letter.updateOne({_id:saveLetter._id},{
       $push:{accepted_phase:[
         {emp_id:initial_phase[i].emp_id,
          level:initial_phase[i].level
           }]} 
      })         
      }
      let encrypt=encryptObject({created:true,error:false,
         message:'Letter has been sent for approval'
     })
         res.send(encrypt)  
     }
      //forwarding conseucative letters to be approved
    else if(n>0&&conseucative){
      //sorting level
      const sorted=initial_phase.sort((a,b)=>{
        return a.level - b.level
      })
   //getting the first manager
 const manager=initial_phase.filter(m=>{
       return m.level === sorted[0].level
        })
    //give letter to first Managers
    for(var i=0;i<manager.length;i++)   
    {
     //first find _id from emp_id
     let  empFind=await Employee.find({emp_id:manager[i].emp_id})
       /**
         * give approval letter to employee founded(empFind)
         * with letter id saved(SaveLetter)
         */
  let giveLetter=await Employee.updateOne({_id:empFind[0]._id},
   {$push: {accepted_letters:[{id:saveLetter._id}]}
           })
     let acceptedLetter=await Letter.updateOne({_id:saveLetter._id},{
 $push:{accepted_phase:[{emp_id:manager[i].emp_id,
        level:manager[i].level
     }]} 
 })              
   }
   let encrypt=encryptObject({created:true,error:false,
     message:'Letter has been sent for approval'
 })
     res.send(encrypt)
 }
  else{
     let encrypt=encryptObject({created:false,error:true,
         message:'their are no Managers set for approval'
     })
         res.send(encrypt)  
       
  }       
     }
  }
  catch (err) {
    console.log(err)
    const response = encryptObject({ created: false, error: true, 
        message: 'Internal server error',err })
    res.send(response)
  }
}
const editLetter = async (req, res) => {
  try {
    //decrypting request
    let decrypt = decrptObject(req.body.data)
    //checking _id and emp_id exists
    let { _id } = decrypt
    let Id = _id ? true : false
    if (Id) {
      /**updating  */
      const Update = await Letter.findByIdAndUpdate(_id, decrypt)
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
const Delete = async (req, res) => {
  try {
    const decrpt = decrptObject(req.body.data)
    let { _id } = decrpt
    if (_id === undefined)
      throw new Error('_id is not set')
    const del = await Letter.findByIdAndDelete(_id)
    let encrpt = encryptObject({ del, deleted: true, error: false, message: '' })
    res.send(encrpt)
  }
  catch (err) {
    console.log(err)
    let encrpt = encryptObject({ deleted: false, error: true, message: err })
    res.send(encrpt)
  }
}
module.exports = { createLetter, getLetters, editLetter, Delete }