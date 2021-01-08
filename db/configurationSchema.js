const connection =require('./connection')
const mongoose= require('mongoose')
/**creating configuration schema */
const configuration=mongoose.Schema({
     dinner:{
         type:Number,
         required:true
     },
    breakfast:{
        type:Number,
        required:true
    },
    lunch:{
        type:Number,
        required:true
    },
    bed:{
        type:Number,
        required:true
    },
    climate_1:{
        type:Number,
        required:true
    },
    climate_2:{
        type:Number,
        required:true
    },
    climate_3:{
        type:Number,
        required:true
    },
    created_date:{
        type:Date,
        default:Date.now
    }
})

/** */
const Configuration=new mongoose.model('Configuration',configuration)
 module.exports=Configuration         
          
          
          
          
          
          
          
          
          
          