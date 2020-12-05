const mongoose = require('mongoose')
/**creating field_alowance */
const fieldAllowance = mongoose.Schema({
    emp_id: {
        type: String,
        unique:true,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    inside_addis_ababa: {
        type: Number,
        required: true
    },
    outside_addis_ababa: {
        type: Number,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

/** */
const FieldAllowance = new mongoose.model('Field_allowance', fieldAllowance)
module.exports = FieldAllowance
