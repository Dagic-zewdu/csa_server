const {
    team_leader, employee, sector_leader, senior_office, director, system_admin,
    f_director, f_employee, f_sector_leader, f_team_leader
} = require('../config/config').token
const jwt= require('jsonwebtoken')
const token = (type, id) => {
    var Token
    if (type === 'team_leader') {
        Token = jwt.sign({id}, team_leader)
    }
    else if (type === 'employee'||type==='others') {
        Token = jwt.sign({id}, employee)
    }
    else if (type === 'sector_leader') {
        Token = jwt.sign({id}, sector_leader)
    }
    else if (type === 'senior_officer') {
        Token = jwt.sign({id}, senior_office)
    }
    else if (type === 'director') {
        Token = jwt.sign({id}, director)
    }
    else if (type === 'system_admin') {
        Token = jwt.sign({id}, system_admin)
    }
    else if (type === 'f_employee') {
        Token = jwt.sign({id}, f_employee)
    }
    else if (type === 'f_team_leader') {
        Token = jwt.sign({id}, f_team_leader)
    }
    else if (type === 'f_director') {
        Token = jwt.sign({id}, f_director)
    }
    else if (type === 'f_sector_leader') {
        Token = jwt.sign({id}, f_sector_leader)
    }
    else {
        Token = null
    }
    return (Token === null ? { signed: false, Token } : { signed: true, Token })
}
module.exports = token