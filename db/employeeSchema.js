const connection =require('./connection')
const mongoose= require('mongoose')
/**creating emplooyees */
const employees=mongoose.Schema({
     emp_id:{
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
    },
    middle_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
     sex:{
        type:String,
        required:true
    },
     position:String,
     department:String,
     official:{
        type:Boolean,
        required:true
    },
     salary:{
        type:Number,
        required:true
    },
     type:{
        type:String,
        required:true
    },
    accepted_letters:[{
        id:String,
        seen:{
           type:Boolean,
           default:false 
        },
        seen_date:Date,
        accepted_date:{
            type:Date,
            default:Date.now
        }
    }],
    approved_letters:[{
        id:String,
        approved:String,
        comment:String,
        approved_date:Date 
    }],
    participation_letter:[{
        id:String,
        seen:{
           type:Boolean,
           default:false 
        },
        seen_date:Date,
        accepted_date:{
            type:Date,
            default:Date.now()
        } 
    }],
    created_date:{
        type:Date,
        default: Date.now()
     }
   
})

/** */
const users=new mongoose.model('employees',employees)
 module.exports=users