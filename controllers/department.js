const department = require('../db/departmentSchema')
const { decrptObject, encryptObject } = require('../auth/encrypt')
const getDepartment = async (req, res) => {
  try {
    /** getting all department data */
    const departments = await department.find({})
    const encrpt = encryptObject(departments.reverse())
    res.send(encrpt)
  }
  catch (err) {
    const encrpt = decrptObject({ error: err })
    res.send(encrpt)
  }
}
const createDepartment = async (req, res) => {
  try {
    const decrypt = decrptObject(req.body.data)
    let { name } = decrypt
    if (name === '' || name === undefined)
      throw new Error('name is not set')
    //check if the department is registered with the same name before
    const checkDepartment = await department.find({ name })
    if (checkDepartment.length > 0) {
      //if department found send this departmnet exist
      let response = encryptObject({
created: false, error: false,message: 'You have registered department with the same name before'
      })
      res.send(response)
    }
    else {
      const saveDepartment = new department(decrypt)
      const save = await saveDepartment.save()
      const response = encryptObject({ save, created: true, error: false, message: 'created successfully' })
      res.send(response)
    }
  }
  catch (err) {
    console.log(err)
    const response = encryptObject({ created: false, error: true, message: err })
    res.send(response)
  }
}
const editDepartment = async (req, res) => {
  try {
    //decrypting request
    let decrypt = decrptObject(req.body.data)
    //checking _id and emp_id exists
    let { _id } = decrypt
    let Id = _id ? true : false
    if (Id) {
      /**updating  */
      const Update = await department.findByIdAndUpdate(_id, decrypt)
      /**encrpting response */
      const encrypt = encryptObject({ Update, updated: true, error: false })
      res.send(encrypt)
    }
    else {
      throw new Error('id is not set')
    }
  }
  catch (err) {
    console.log(err)
    /**send error */
    let encrypt = encryptObject({ error: true, message: err })
    res.send(encrypt)
  }
}
const Delete = async (req, res) => {
  try {
    const decrpt = decrptObject(req.body.data)
    let { _id } = decrpt
    if (_id === undefined)
      throw new Error('_id is not set')
    const del = await department.findByIdAndDelete(_id)
    let encrpt = encryptObject({ del, deleted: true, error: false, message: '' })
    res.send(encrpt)
  }
  catch (err) {
    console.log(err)
    let encrpt = encryptObject({ deleted: false, error: true, message: err })
    res.send(encrpt)
  }
}
module.exports = { createDepartment, getDepartment, editDepartment, Delete }