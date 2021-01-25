const Allowance = require('../db/allowanceSchema')
const Employee = require('../db/employeeSchema')
const { decrptObject, encryptObject } = require('../auth/encrypt')

//get allowance data
const getAllowances = async (req, res) => {
    try {
        const get = await Allowance.find({})
        let Allowances = encryptObject(get.reverse())
        res.send(Allowances)
    }
    catch (err) {
        console.log(err)
        let error = encryptObject({ error: err })
        res.send(error)
    }
}
const generateId = async () => {
    const find = await Allowance.find({})
    /**reverse array of find allowance if allowance is not created take default csa-0 */
    let reverse = find.length ? find.reverse() : [{ id: 'csa-0' }]
    /**get the id from array of allowance reversed */
    let firstElement = reverse[0].id === 'csa-0' ? 'csa-0' : reverse[0].id
    /**split to an array of [csa,number] */
    let split = firstElement.toString().split('-')
    /**if it 0 return zero else add a value */
    let getIndex = find.length? parseInt(split[1]) + 1 : 0 
    //concatinate the string
    let id = 'csa-' + getIndex.toString()
    return id
}
//create allowance
const createAllowance = async (req, res) => {
    try {
        const allowance = decrptObject(req.body.data)
        /**generating unique id */
        var id = await generateId()
        var check = await Allowance.find({ id })
        while (check.length !== 0) {
            id = await generateId()
            check = await Allowance.find({ id })
        }
        //save allowance
        const saveAllowance = new Allowance({ ...allowance, id })
        const SaveAllowance = await saveAllowance.save()
        const encrypt = encryptObject({
            created: true, error: false,
            message: 'Allowance save successfull', SaveAllowance
        })
        res.send(encrypt)
    }
    catch (err) {
        console.log(err)
        let encrpt = encryptObject({ created: false, error: false, message: 'canot save server error', err })
        res.send(encrpt)
    }
}
const General_editAllowance = async (req, res) => {
    try {
        let decrypt = decrptObject(req.body.data)
        let { _id } = decrypt
        let Id = _id ? true : false
        if (Id) {
            /**updating  */
            const Update = await Allowance.findByIdAndUpdate(_id, decrypt)
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
const DeleteAllowance = async (req, res) => {
    try {
        const decrpt = decrptObject(req.body.data)
        let { _id } = decrpt
        if (_id === undefined)
            throw new Error('_id is not set')
        const del = await Allowance.findByIdAndDelete(_id)
        let encrpt = encryptObject({ del, deleted: true, error: false, message: 'Deleted successfully' })
        res.send(encrpt)
    }
    catch (err) {
        console.log(err)
        let encrpt = encryptObject({
            deleted: false, error: true,
            message: 'can not delete please try again later'
        })
        res.send(encrpt)
    }
}

module.exports = {
    createAllowance, getAllowances, General_editAllowance,
    DeleteAllowance
}