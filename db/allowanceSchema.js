const mongoose= require('mongoose')
/**creating configuration schema */
const allowance=mongoose.Schema({
    /**creating from document */
    department:{
        type:String,
        required:true
    },
    id:{
        type: String,
        unique:true,
        required: true
    },
    project_name:String,
    letter_id:{
        type:String,
        required:true
    },
    program:String,
    objective:String,
    initial_place:{
        type:String,
        required:true
    },
    destination_place:{
        type:String,
        required:true
    },
    initial_date:{
        type:Date,
        required:true
    },
destination_date:{
            type:Date,
            required:true
        },
    save_options:String,
    creater:{    //emp_id of allowance creater
        type:String,
        required:true
    },
    /***/
    approval_manager:{
       emp_id:String,
       seen:{
           type:Boolean,
           default:false
       },
       type :{  // Manager type (director || sector_leader || senior_officer )   
       type:String
    },
       approved:{
        type:String, //approved un approved commented
        default:'waiting'
       },
       approved_date:Date,
       accepted_date:Date,//accepted date from employee
       seen_date:Date,
       comment:String  
    },
   
/**finance pending */
  f_pending_dr:{
        emp_id:String,
        seen:{
            type:Boolean,
            default:false
        },
        approved:{
         type:String, //approved un approved commented
         default:'waiting'
        },
        approved_date:Date,
        accepted_date:Date,
        seen_date:Date,
        comment:String    
    },
    f_pending_tl:{
        emp_id:String,
        seen:{
            type:Boolean,
            default:false
        },
        accepted_date:Date, //accepted date from manager
        seen_date:Date,   //seen date of the allowance
        forwarded:{   //forward true if it is forwarded to finance employee
            type:Boolean,
            default:false
        },

    },
    f_pending_emp:{
        emp_id:String,
        seen:{
            type:Boolean,
            default:false
        },
        accepted_date:Date, //accepted date when forwarding from finance team leader 
        seen_date:Date,  //seen date of the finance employee
         calculated:{
            type:String,   //draft approve waiting
            default:'waiting'     
         },
       calculated_date:Date,
       redone:{    //redone if the the calculation is commented by team leader
         type:Boolean,
         default:false  
       },
       redone_director:{  //redone if the calculation is commented by Director
         type:Boolean,
         default:false  
       }  
    },
    /**approve finance */
      
      f_approve_dr:{
        emp_id:String,
        seen:{
            type:Boolean,
            default:false
        },
        seen_date:Date,
        approved_date:Date,
        comment:String,
        approved:{
         type:String, //approved un approved commented
         default:'waiting'
        },
        approved_date:Date,
        comment:String 
      },
      f_approve_tm:{
        emp_id:String,
        seen:{
            type:Boolean,
            default:false
        },
       approved:{
         type:String, //approved un approved commented
         default:'waiting'
        },
        approved_date:Date,
        seen_date:Date,
        comment:String 
     },
       climate_id:String,  //climate place id
       totall_amount:Number,
       reserve_amount:Number,
       living_allowance:Number,
       day_allowance:Number,
       petrol_allowance:Number,
       climate_allowance:Number,
       pre_paid:Number,
        all_done:{ //if true stops all final approval from finance director
         type:Boolean,
         default:false
        },  
        place_id:String, //caculation done place_id
        type:String, // calculation done =>day allowance,living allowance
        breakfast:Number,
        lunch:Number,
        dinner:Number,
        bed:Number,
        scale:Number,   //emp_id who paid
        region:String,   //place region if it is not calculated by place_id
        place_type:String, //place type if it is not calculated by place_id
    created_date:{
        type:Date,
        default:Date.now
    }           
    })

/** */
const Allowance=new mongoose.model('Allowance',allowance)
 module.exports=Allowance         
          
          
          
          
          
          
          
          
          
          