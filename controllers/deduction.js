const { encryptObject, decrptObject } = require('../auth/encrypt')
const Deduction=require('../db/deductionSchema')

/**returns all deduction data */
const getDeductions=async (req,res)=>{
    try{
   const deductions=await Deduction.find({})
   const data=encryptObject(deductions.reverse())
   res.send(data)
    }
    catch(err){
        console.log(err)
   res.send(encryptObject({error:err}))
    }
}
const generateID= async () => {
    const find = await Deduction.find({})
    /**reverse array of find allowance if allowance is not created take default csa-0 */
    let reverse = find.length ? find.reverse() : [{ id: 'csd-0' }]
    /**get the id from array of allowance reversed */
    let firstElement = reverse[0].id === 'csd-0' ? 'csd-0' : reverse[0].id
    /**split to an array of [csa,number] */
    let split = firstElement.toString().split('-')
    /**if it 0 return zero else add a value */
    let getIndex = find.length? parseInt(split[1]) + 1 : 0 
    //concatinate the string
    let id = 'csd-' + getIndex.toString()
    return id
}
const createDeduction=async (req,res)=>{
    try{
        var id = await generateID()
        var check = await Deduction.find({ id })
        while (check.length !== 0) {
            id = await generateID()
            check = await Deduction.find({ id })
        }
        const deduction=decrptObject(req.body.data)
        const DEduction=new Deduction({...deduction,id})
        const SaveDeduction=await  DEduction.save()
    const encrypt=encryptObject({
           created:true,error:false,
           message:'Created Successfully',
           deduction:SaveDeduction
          }) 
         res.send(encrypt)  
       }
         catch(err){
             console.log(err)
         let encrpt=encryptObject({created:false,error:true,message:err})
         res.send(encrpt)
         }
}
const editDeduction=async (req,res)=>{
    try {
        let decrypt = decrptObject(req.body.data)
        let { _id } = decrypt
        let Id = _id ? true : false
      if (Id) {
            /**updating  */
            const Update = await Deduction.findByIdAndUpdate(_id, decrypt)
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
        let encrypt = encryptObject({ error: true, message: err ,updated:false })
        res.send(encrypt)
    }
}
const deleteDeduction = async (req, res) => {
    try {
      const decrpt = decrptObject(req.body.data)
      let { _id } = decrpt
      if (_id === undefined)
        throw new Error('_id is not set')
      const del = await Deduction.findByIdAndDelete(_id)
      let encrpt = encryptObject({ del, deleted: true, error: false, message: '' })
      res.send(encrpt)
    }
    catch (err) {
      console.log(err)
      let encrpt = encryptObject({ deleted: false, error: true, message: err })
      res.send(encrpt)
    }
  }
module.exports={getDeductions,createDeduction,editDeduction,deleteDeduction}