const mongoose= require('mongoose')
/**creating users(emplooyee) */
const Letter=mongoose.Schema({
    letter_date:{
        type:String,
        required:true
    },
    project_name:String,
    project_code:String,
    number:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    files:[{name:String}],
    conseucative:Boolean,
    participants:[{emp_id:String}],
    initial_phase:[
        {
            emp_id:String,
            level:Number
        }
    ],
    accepted_phase:[{emp_id:String,level:Number}],
    approval_phase:[{emp_id:String,level:Number}],
    denied:[{emp_id:String,level:Number}],
    commented:[{emp_id:String,level:Number}],
    saveOptions:String,
    creater:String         //employee id of the creater
})

/** */
const letter=new mongoose.model('Letter',Letter)
 module.exports=letter