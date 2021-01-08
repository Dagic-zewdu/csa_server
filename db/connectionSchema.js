const mongoose= require('mongoose')
/**creating configuration schema */
const connection=mongoose.Schema({
     emp_id:{
        type:String,
        required:true
     },
     status:{
        type:String,
        required:true  
     },
     connected_time:{
        type:Date,
        default:Date.now 
     },
     disconnected_time:Date
})

/** */
const userConnection=new mongoose.model('Connection',connection)
 module.exports=userConnection         
          
          
          
          
          
          
          
          
          
          