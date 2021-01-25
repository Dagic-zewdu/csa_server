const mongoose= require('mongoose')


/**creating users(emplooyee) */
const Letter=mongoose.Schema({
   id:{type:String,required:true,unique:true},
   creater:{type:String,required:true},
   type:{type:String,required:true},
   title:{type:String,required:true},
   description:{type:String,required:true},
   participants:[{
       emp_id:String,
       recieved_date:Date,
       seen:{type:Boolean,default:false}
     }],
   approval_manager:[{
       emp_id:String,
       step:Number,
       status:{type:String,default:'waiting'},
       seen:{type:Boolean,default:false},
       seen_date:Date,
       approved_date:Date
   }],
   objective:String,
   initial_place:String,
   destination_place:String,
   initial_date:Date,
   return_date:Date,
   project_name:String,
   program:String,
   created_date:{type:Date,default:Date.now},
   
})

/** */
const letter=new mongoose.model('Letter',Letter)
 module.exports=letter