const mongoose= require('mongoose')
/**creating configuration schema */
const company=mongoose.Schema({
     name:{
         type:String,
         required:true
     },
    logo:String,
    dept_length:{
        type:Number,
        required:true
    },
    emp_length:{
        type:Number,
        required:true
    },
    city:String,
    subcity:String,
    woreda:String,
    house:String,
    phone_1:String,
    phone_2:String,
    created_date:{
        type:Date,
        default:Date.now
    }
})

/** */
const Company=new mongoose.model('Company',company)
 module.exports=Company         
          
          
          
          
          
          
          
          
          
          