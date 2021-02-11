const Letter = require('../db/letterSchema')
const { encryptObject,decrptObject } = require('../auth/encrypt')

/**getting all letters arrray of object */
const getLetters=async ()=>await Letter.find({})
const GetLetters=async (req,res)=>{
  try{
  const letters=await getLetters()
  res.send(encryptObject(letters))
  }
  catch(err){

  }
}
/**emits letters for all socket connection
 * @param {*} io-socket io library object for only broadcasting 
 */
const emitLetterrs=async io=>{
  const letters=await getLetters()
 io.sockets.emit('letters',letters) 
}
const generateId = async () => {
  const find = await Letter.find({})
  /**reverse array of find Letter if Letter is not created take default csa-0 */
  let reverse = find.length ? find.reverse() : [{ id: 'csl-0' }]
  /**get the id from array of Letter reversed */
  let firstElement = reverse[0].id === 'csl-0' ? 'csl-0' : reverse[0].id
  /**split to an array of [csa,number] */
  let split = firstElement.toString().split('-')
  /**if it 0 return zero else add a value */
  let getIndex = find.length? parseInt(split[1]) + 1 : 0 
  //concatinate the string
  let id = 'csl-' + getIndex.toString()
  return id
}
/**it create letter to the  datatbase
 * @param {*} data- data to update 
 * @param {*} io-socket io library object for only broadcasting
 */
const createLetter=async (data,io)=>{
  try{
    var id = await generateId()
    var check = await Letter.find({ id })
    while (check.length !== 0) {
        id = await generateId()
        check = await Letter.find({ id })
    }
   const letter=new Letter({id,...data})
   const save=await letter.save()
 io.sockets.emit('create_letter',{rid:data.rid,...save})
   emitLetterrs(io)
  }
  catch(err){
    console.log(err)
  }
}

/**it edit's letter from datatbase
 * @param {*} data- data to update 
 * @param {*} io-socket io library object for only broadcasting
 */
const editLetter=async (data,io)=>{
  try{
    const letter=await Letter.findByIdAndUpdate(data._id,data)
   io.sockets.emit('update_letter',{_id:data._id,...letter})
    emitLetterrs(io)
    }
    catch(err){
    console.log(err)
    }
}
const EditLetter = async (req, res) => {
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
/**it delete's letter from datatbase
 * @param {*} data- data to update 
 * @param {*} io-socket io library object for only broadcasting
 */
const deleteLetter=async (data,io)=>{
  try {
    const del = await Letter.findByIdAndDelete(data._id)

  }
  catch (err) {
  console.log(err)
  }
}
const DeleteLetter=async (req,res)=>{
  try {
    const decrpt = decrptObject(req.body.data)
    let { _id } = decrpt
    if (_id === undefined)
        throw new Error('_id is not set')
    const del = await Letter.findByIdAndDelete(_id)
    let encrpt = encryptObject({ del, deleted: true, error: false, message: 'Deleted successfully' })
    res.send(encrpt)
}
catch (err) {
    console.log(err)
    let encrpt = encryptObject({
        deleted: false, error: true,
        message: 'can not delete please try again later'
    })
    res.send(encrpt)
}
}
module.exports = { createLetter, getLetters, editLetter,GetLetters,
                  deleteLetter , emitLetterrs,DeleteLetter,EditLetter}