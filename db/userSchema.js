const connection =require('./connection')
const mongoose= require('mongoose')
const {Schema}=mongoose
/**creating users(emplooyee) */
const Users=mongoose.Schema({
    username:{
      type:String,
      required:true
  },
    password:{
      type:String,
      required:true
  },
  user_type:{
    type:String,
    required:true
},
     emp_id:{
      type:String,
      required:true, 
     },
      access:{
        type:String,
        default:'activated'
      },
      phone_1:String,
      phone_2:String,
     created_date:{
      type:Date,
      default: Date.now
   }

})

/** */
const users=new mongoose.model('users',Users)
 module.exports=users