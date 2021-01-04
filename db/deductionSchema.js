const mongoose= require('mongoose')
/**creating users(emplooyee) */
const Deduction=mongoose.Schema({
  id:{
      required:true,
      unique:true,
      type:String
  },
  allowance_id:{
    required:true,
    type:String
  }, //allowance _id attached not allowance id
  initial_time:{
     hour:{type:Number,required:true},
     min:{type:Number,required:true} 
  },
  initial_day:{
     breakfast:String,lunch:String,dinner:String,bed:String
  },
  initial_date:{
    type: Date,
    required:true
    },
   spending_days:[{
       from_date:String,upto_date:String,
       breakfast:String,lunch:String,dinner:String,bed:String  
   }],
   return_time:{
    hour:{type:Number,required:true},
    min:{type:Number,required:true}
    },
    return_day:{
        breakfast:String,lunch:String,dinner:String,bed:String  
    },
    return_date:{
        type: Date,
        required:true
    },
    petrol:Number,
    maintainace:Number,
    other:Number,
    save_options:String,
    approval_manager:{
        seen:{type:Boolean,default:false},
        emp_id:String,
        approve:{
          type:String,
          default:'waiting'  
        },
        comment:String,
        approved_date:Date,
        seen_date:Date
    },
    f_tl_pending:{
        seen:{type:Boolean,default:false},
        emp_id:String,
        approve:{
            type:String,
            default:'waiting'  
          },
        comment:String,
        approved_date:Date
    },
    f_employee:{
       seen:{type:Boolean,default:false},
       emp_id:String,
       calculated:{
        type:Boolean,
        default:false  
      },
       accepted_date:Date,
       save_options:{type:String,default:'Approve'},
       calculated_date:Date,
       seen_date:Date,
       redone:{type:Boolean,default:false} //redone from team leader
    },
    /**calculated place initial day */
    c_initial_day:{
        breakfast:{place_id:String,climate_place:String,project_allowance:String,scale:Number,c_scale:Number}, 
        lunch:{place_id:String,climate_place:String,project_allowance:String,scale:Number,c_scale:Number},
        dinner:{place_id:String,climate_place:String,project_allowance:String,scale:Number,c_scale:Number},
        bed:{place_id:String,climate_place:String,project_allowance:String,scale:Number,c_scale:Number}
     },
     /**calculated return day places */
    c_return_day:{
     breakfast:{place_id:String,climate_place:String,project_allowance:String,scale:Number,c_scale:Number},
     lunch:{place_id:String,climate_place:String,project_allowance:String,scale:Number,c_scale:Number},
    dinner:{place_id:String,climate_place:String,project_allowance:String,scale:Number,c_scale:Number}   
    },
    /**calculated spending day places */
    c_spending_days:[{
  s_id:String,type:{type:String},
  duration:Number,place_id:String,
  climate_place:String,project_allowance:String,
  scale:Number,c_scale:Number
    }],
    f_tl_approve:{
        seen:{type:Boolean,default:false},
        approve:{
            type:String,
            default:'waiting'  
          },
        comment:String,
        approved_date:Date,
        redone:{type:Boolean,default:false}
    },
    totall_amount:Number,
    difference_amount:Number,
    climate_amount:Number,
    day_amount:Number,   //day allowance amount
    creater:{type:String,required:true},   //emp_id of the deduction creater 
    created_date:{
        type:Date,
        default:Date.now
    },
    c_seen:{type:Boolean,default:false}  //completed seen  set true if final result is seen by the user
 })

/** */
const deduction=new mongoose.model('Deduction',Deduction)
 module.exports=deduction