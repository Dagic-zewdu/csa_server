const router = require('express').Router()
const { createEmployee: create, Delete, getEmployees,
    editEmployees } = require('./controllers/employee')
const {
    createDepartment, getDepartment, editDepartment,
    Delete: deleteDepartment } = require('./controllers/department')
const { createPlace, getPlaces, editPlaces, Delete: deletePlace } = require('./controllers/place')
const { SignUp, Login , getUsers, resetPassword, accessUser, deleteUser } = require('./controllers/users')
const {
       create:CreateFieldAllowance,
       getEmployees:getFieldEmployees,
       editFieldEmployees,
       deleteFieldAllowance
    }= require('./controllers/fieldAllowance')
const { getConfig, createConfigaration, editConfig } = require('./controllers/configuration')
const { createCompany, getCompany, editCompany } = require('./controllers/company')
const { uploadFile, deleteFile, letterFiles } = require('./controllers/upload')
const { adminAuth,userauth } = require('./auth/authRoute')
const { getAllowances, createAllowance, General_editAllowance, DeleteAllowance } = require('./controllers/allowance')
const { getClimatePlaces, createClimatePlaces, createClimatePlace, updateGeneralName, removePlaces } = require('./controllers/climatePlaces')
const { getDeductions, createDeduction, editDeduction, deleteDeduction } = require('./controllers/deduction')
const { DeleteLetterMessage, SaveMessage, GetMessages } = require('./controllers/messages')
const { GetLetters, DeleteLetter, EditLetter } = require('./controllers/letter')
/**Employee route */
router.get('/api/employee', getEmployees)
router.post('/api/createEmployee',adminAuth ,create)
router.put('/api/employee',adminAuth, editEmployees)
router.put('/api/delEmployee',adminAuth, Delete)
/**---
 * adminAuth represents the authentication of route to admin
 */

/**Department route */
router.route('/api/department')
    .post(adminAuth ,createDepartment)
    .get(getDepartment)
    .put(adminAuth ,editDepartment)
router.put('/api/delDepartment',adminAuth, deleteDepartment)

/**places route */
router.route('/api/places')
    .post(adminAuth ,createPlace)
    .get(getPlaces)
    .put(adminAuth ,adminAuth,editPlaces)
router.put('/api/delPlace', deletePlace)

/**users route */
router.post('/api/signup', SignUp)
router.post('/api/login', Login)
router.put('/api/resetPassword',adminAuth,resetPassword) //reset password purpose
router.put('/api/accessUser',adminAuth,accessUser)
router.route('/api/users')
 .get(getUsers)
 .post(adminAuth,deleteUser)              //delete user
/**employees with field allowance */
router.route('/api/fieldAllowance')
 .post(adminAuth,CreateFieldAllowance)  //creating field allowance employees
 .get(getFieldEmployees)    //getting field allowance employee
 .put(adminAuth,editFieldEmployees)   //editing field allowance employee
router.put('/api/delFieldAllowance',adminAuth,deleteFieldAllowance)  //deleting field allowance
/** configuration route */
router.route('/api/config')
  .get(getConfig)               //getting configuration data
  .post(createConfigaration)    //creating system configuration
  .put(adminAuth,editConfig)     //edit configuration data
  /**climate Palces */
router.route('/api/climatePlaces')
  .get(getClimatePlaces)        //for getting getting climate place data
  .post(userauth,createClimatePlaces)   //for creating climate allowance place
  .put(userauth,updateGeneralName)  //for updating multiple general climate place name
  /**add single place */
router.route('/api/addPlace')
 .post(userauth,createClimatePlace) //adding single climate place
 .put(userauth,removePlaces) //removing multiple places
  /**uploading file routes */
router.route('/api/file')  
   .post(uploadFile)    //for uploading files
   .put(deleteFile)     //for deleting files
  /**company route */
router.route('/api/company')
  .get(getCompany)              //getting company data
  .post(createCompany)          //for saving company info
  .put(adminAuth,editCompany)    //for editing company info
/**Allowance routes */
router.route('/api/allowances')
  .get(getAllowances)
  .post(userauth,createAllowance)  //for creating allowances
  .put(userauth,General_editAllowance) 
router.put('/api/delAllowance',userauth,DeleteAllowance)
/**Deductions router */
router.route('/api/deductions')
   .get(getDeductions)
   .post(userauth,createDeduction)    //creating new deduction
   .put(userauth,editDeduction)    //updating deduction
router.put('/api/delDeduction',userauth,deleteDeduction)
   /**date route */
router.get('/api/date',(req,res)=>{
  let date=Date.now()
  res.status(200).send({date:Date.now()})  
})
/**message */
router.route('/api/messages')
.post(userauth,SaveMessage) // for creating messages
.get(GetMessages)   //for getting all messages
router.put ('/api/delMessages',userauth,DeleteLetterMessage) //deleting multiple messages

/**Letters */
router.route('/api/letter').put(userauth,EditLetter) //Edit letter
router.route('/api/letters')
.get(GetLetters)   //getting letters data
.put(DeleteLetter)   //for deleting letter


module.exports = router