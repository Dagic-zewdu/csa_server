const connection =require('./connection')
const mongoose= require('mongoose')
const {Schema}=mongoose
/**creating users(emplooyee) */
const Department=mongoose.Schema({
  name:{
      type:String,
      required:true
  },
  phone:String,
  office_number:String,
   created_date:{
      type:Date,
      default: Date.now
   }
})

/** */
const department=new mongoose.model('department',Department)
 module.exports=department