const mongoose= require('mongoose')
/**creating configuration schema */
const message=mongoose.Schema({
   sender:{
       type:String,
       required:true
   },
   reciever:{
   type:String,
   required:true
   },
   message:String,
   created_date:{
       type:Date,
        default:Date.now
   },
   letter_id:{
      type:String,
      default:'' 
   },
   file_name:{
       type:String,
       default:''
   },
   seen:{
      type:Boolean,
      default:false,
   }
})

/** */
const messages=new mongoose.model('Message',message)
 module.exports=messages         
          
          
          
          
          
          
          
          
          
          