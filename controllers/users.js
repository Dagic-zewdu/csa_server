const User = require('../db/userSchema')
const { decrptObject, encryptObject } = require('../auth/encrypt')
const token = require('../auth/jwtSign')
const bcrypt = require('bcryptjs')
const getUsers=async (req,res)=>{
    try{
 const allUsers=await User.find({},
  '_id username user_type emp_id allowances created_date access')
  const secure=encryptObject(allUsers.reverse())
     res.send(secure)   
    }
    catch(err){
        
  console.log(err)
  let encrypt=encryptObject({error:err})
  res.send(err)
    }
}
const SignUp = async (req, res) => {
    try {
        //decrypting an object
        const decrypt = decrptObject(req.body.data)
        //setting user type and employee_id to jwt-sign
        const { user_type, emp_id } = decrypt
        const find = await User.find({ emp_id })
        /**
         * checking if the user is signed with this id before
         */
        if (find.length > 0) {
            let was_found = encryptObject({
                signed: false, Token: '', error: false,
                message: 'user signed with this id before if you forget your password contact admin inorder to reset your password'
            })
            res.send(was_found)
        }
        else {
            /**
               * encrypting  password inorder securely store to db
               */
            const salt = await bcrypt.genSalt(10)
            const password = await bcrypt.hash(decrypt.password, salt)

            //saving the user 
            const saveUser = new User({ ...decrypt, password })
            const user = await saveUser.save()
            //signing with jwt and recieving the token
            const { signed, Token } = token(user_type, user._id)

            if (!signed)
                throw new Error('can not sign a user... no authentication of user')
            let encrypt = encryptObject({
                signed: true, Token, error: false, message: 'signed up successfully',
                id: user._id
            })
            res.send(encrypt)
        }
    }
    catch (err) {
        console.log(err)
        let encypt = encryptObject({
            signed: false, Token: '', error: true,
            message: err
        })
        res.send(encypt)
    }
}
const Login = async (req, res) => {
    try {
        //decrypting request
        const decrypt = decrptObject(req.body.data)

        const { emp_id, password } = decrypt
        //finding employee
        const user = await User.find({ emp_id })
        //if not found show user is not found
        if (user.length === 0) {

            let secure = encryptObject({ login: false, error:false, message: 'sorry unknown employee id' })
            res.status(200).send(secure)
        }
        else {
            //comparing password
            const { _id, user_type, password: psw, access } = user[0]
            const compare = await bcrypt.compare(password, psw)

            if (compare) {
                //authenticating user with a token
                const { signed, Token } = token(user_type, _id)
                if (!signed)
                    throw new error('authenticating with token failed')
                //encrypting response
                let encrypt = encryptObject({
                    login: true, error:false, Token, message: 'welcome', 
                    user_type, id: _id ,access ,emp_id
                })
                //sending response
                res.send(encrypt)
            }
            else {
                //sending error when password don't match
                let secured = encryptObject({ login: false, error:false, message: "Invalid password" })
                res.status(200).send(secured)
            }
        }
    }
    catch (err) {
        console.log(err)
        let errorSecured = encryptObject({ login: false, error: true, message: err })
        res.send(errorSecured)
    }
}
const resetPassword=async (req,res)=>{
    try{
        //decrypting response
  const decrypt=decrptObject(req.body.data)
     //extracting the password
  const {password:psw,_id}=decrypt
  //if the _id doesn't exist show error message
  if(_id===undefined||_id===''){
   let encrypt=encryptObject({reset:false,error:false,message:'id is not set'})
   res.send(encrypt)      
 }
     else{
     //hash the password
  const salt = await bcrypt.genSalt(10)
  const password = await bcrypt.hash(psw, salt)
     //find the employee  with an id
     const Update = await User.findByIdAndUpdate(_id,{password})
     //encrypting response
    let encypt=encryptObject({Update,reset:true,error:false})
     res.send(encypt)
     }
}
    catch(err){
 console.log(err)
    /**send error */
    let encrypt=encryptObject({error:true,message:err})
    res.send(encrypt)
    }
}
const accessUser=async (req,res)=>{
    try{
        //decrypting request
     let decrypt=decrptObject(req.body.data)
       /**
        * *setting id and access from request setting user
        * access is done on client the server is only responsible for saving the user access
        */
     let {_id,access}=decrypt
    let acess=await User.findByIdAndUpdate(_id,{access})
    let encrypt=encryptObject({activation:true,acess,error:false})
    res.send(encrypt)    
}
    catch(err){
console.log(err)
   /**send error */
   let encrypt=encryptObject({error:true,message:err,activation:false})
   res.send(encrypt)
    }
}
const deleteUser=async (req,res)=>{
    try{
        const decrpt=decrptObject(req.body.data)
        let {_id}=decrpt
        if(_id===undefined)
        throw new Error('_id is not set')
        const del=await User.findByIdAndDelete(_id)
        let encrpt=encryptObject({del,deleted:true,error:false,message:'Deleted successfully'})
        res.send(encrpt)
    }
    catch(err){
    console.log(err)
    let encrpt=encryptObject({deleted:false,error:true,message:err})
    res.send(encrpt)
    }
}
module.exports = { SignUp, Login ,getUsers,resetPassword,accessUser,deleteUser }