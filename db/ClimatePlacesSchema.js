const mongoose= require('mongoose')
/**creating climate places */
const Places=mongoose.Schema({
  general_name:{
      type:String,
      required:true,
      unique:true
  },
  name:{
    type:String,
    required:true,
    unique:true
   },
  level:{
    type:String,
    required:true,
    unique:true
    },
   created_date:{
      type:Date,
      default: Date.now
   }
})

/** */
const places=new mongoose.model('Climate_Places',Places)
 module.exports=places