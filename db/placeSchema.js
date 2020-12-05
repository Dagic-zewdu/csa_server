const mongoose= require('mongoose')
/**creating users(emplooyee) */
const place=mongoose.Schema({
    name:String,
    region:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    superintendent_allowance:Number,
    higher_officer_allowance:Number,
    spr_members_1:Number,
    spr_members_2:Number,
    other_allowances:Number,
    normal_scale_1:Number,
    normal_scale_2:Number,
    normal_scale_3:Number,
    climate_allowances:String,
    created_date:{
        type:Date,
        default:Date.now
    }
})

/** */
const Places=new mongoose.model('Place',place)
 module.exports=Places


